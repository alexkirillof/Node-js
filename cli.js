const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const isDir = (dirPath) => fs.lstatSync(dirPath).isDirectory();

const getParamsFromUser = async() => {
    const serchParams = { dirToSearch: '', pattern: '' };

    const { thisDir } = await inquirer.prompt([{
        name: 'thisDir',
        type: 'confirm',
        message: 'Искать в текущей директории?'
    }]);

    if (!thisDir) {
        serchParams.dirToSearch = (await inquirer.prompt([{
            name: 'dirToSearch',
            type: 'input',
            message: 'Your path: '
        }])).dirToSearch;
    } else {
        serchParams.dirToSearch = process.cwd();
    }

    serchParams.pattern = (await inquirer.prompt([{
        name: 'pattern',
        type: 'input',
        message: 'Pattern: '
    }])).pattern;

    return serchParams;
};

const main = async() => {
    const { dirToSearch, pattern } = await getParamsFromUser();
    const foundFiles = [];
    const dirsToResearch = [];
    dirsToResearch.push(dirToSearch);

    while (dirsToResearch.length > 0) {
        const currentDir = dirsToResearch.shift();
        const dirContains = fs.readdirSync(currentDir);
        const inDirFiles = dirContains.filter((fileName) => fileName.indexOf(pattern) !== -1);
        const inDirDirs = dirContains.map((dirName) => path.join(currentDir, dirName)).filter(isDir);
        foundFiles.push(...inDirFiles);
        dirsToResearch.push(...inDirDirs);
    }

    console.log(foundFiles);
};

main();