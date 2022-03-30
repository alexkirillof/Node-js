const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');




const options = async() => {
    const serchParams = { dirToSearch: '', pattern: '' };

    const { thisDir } = await inquirer.prompt([{
        name: 'thisDir',
        type: 'confirm',
        message: 'search here:',
        describe: 'search here'
    }]);

    if (!thisDir) {
        serchParams.dirToSearch = (await inquirer.prompt([{
            name: 'dirToSearch',
            type: 'input',
            message: 'indicate the path: ',
            describe: 'indicate the path'
        }])).dirToSearch;
    } else {
        serchParams.dirToSearch = process.cwd();
    }

    serchParams.pattern = (await inquirer.prompt([{
        name: 'pattern',
        type: 'input',
        message: 'Pattern: ',
        describe: 'Pattern'
    }])).pattern;

    return serchParams;
};


const dir = (dirPath) => fs.lstatSync(dirPath).isDirectory();


const run = async() => {
    const { dirToSearch, pattern } = await options();
    const files = [];
    const dirsToResearch = [];
    dirsToResearch.push(dirToSearch);

    while (dirsToResearch.length > 0) {
        const currentDir = dirsToResearch.shift();
        const dirContains = fs.readdirSync(currentDir);
        const inDirFiles = dirContains.filter((fileName) => fileName.indexOf(pattern) !== -1);
        const inDirDirs = dirContains.map((dirName) => path.join(currentDir, dirName)).filter(dir);
        files.push(...inDirFiles);
        dirsToResearch.push(...inDirDirs);
    }

    console.log(files);
};

run();