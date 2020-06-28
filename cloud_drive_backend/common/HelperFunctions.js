
function getLevels(path){
    let arrays = path.split('/');
    let levels = arrays.filter(element => element).length;
    return levels;
}

function getDirNames(path, level){
    let arrays = path.split('/');
    let filtered = arrays.filter(element => element);
    filtered.length = level + 1;
    let result = filtered.join('/');
    return '/' + result;
}

function getDirContent(items, levels){
    let files = [];
    items.forEach((element)=>{
        let elementLevels = getLevels(element.fullPath);
        let fileType = (elementLevels === levels + 1) ? process.env.FILE : process.env.DIR;
        let item = (fileType === process.env.FILE) ? {...element._doc, fileType: fileType} : {filename: getDirNames(element.fullPath, levels), fileType: fileType};
        files.push(item);
    });
    const results = files.filter((element, index) => {
        const _file = JSON.stringify(element);
        return index === files.findIndex(obj => {
            return JSON.stringify(obj) === _file;
        });
    });
    return results;
}

module.exports = {getLevels, getDirContent};