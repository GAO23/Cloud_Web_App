
// return the levels of sub dir by a file path name
function getLevels(path){
    let arrays = path.split('/');
    let levels = arrays.filter(element => element).length;
    return levels;
}

// return the full dir name of a file dir given its full file path name
function getFileDirName(filename){
    let arrays = filename.split('/');
    let filtered = arrays.filter(element => element);
    filtered.pop();
    let results = '/' + filtered.join('/');
    return results;
}

// return the full name of dir at a given level from its full path name
function getDirNames(path, level){
    let arrays = path.split('/');
    let filtered = arrays.filter(element => element);
    filtered.length = level + 1;
    let result = filtered.join('/');
    return '/' + result;
}

// return all the content of a dir, both files and sub dir
function getDirContent(items, levels){
    let files = [];
    items.forEach((element)=>{
        // let elementLevels = getLevels(element.fullPath);
        // if (elementLevels !== levels + 1) return;
        let fileType =  (!element.isDir) ? process.env.FILE : process.env.DIR;
        let item = (fileType === process.env.FILE) ? {...element._doc, fileType: fileType} : {filename: getDirNames(element.fullPath, levels), fileType: fileType};
        files.push(item);
    });
    // const results = files.filter((element, index) => {
    //     const _file = JSON.stringify(element);
    //     return index === files.findIndex(obj => {
    //         return JSON.stringify(obj) === _file;
    //     });
    // });
    return files;
}

module.exports = {getFileDirName, getLevels, getDirContent};