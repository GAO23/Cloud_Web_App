const File = require("../models/file");
const {mongoose} = require('../common/mongo');
const ObjectId = mongoose.Types.ObjectId;

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

// get the file name from a given full path
function getFileName(path_para){
    let array = path_para.split('/');
    let filtered = array.filter(element => element);
    return filtered[filtered.length - 1];
}

// return all the content of a dir, both files and sub dir
function getDirContent(items, levels){
    let files = [];
    items.forEach((element)=>{
        files.push(element);
    });
    return files;
}

// calculate the size of a directory
async function calculateDirSize(dirPath, userId){
    try{
       let result = await File.aggregate([
            {$match: {fullPath: {$regex: `^${dirPath}/*`, $options: 'i'}, _ownerId: new ObjectId(userId), isDir: true}},
            { $group: { _id: null, size: { $sum: "$size" }}}
        ]);
       console.log(result[0].size);
        return result[0].size;
    }catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {getFileName, getFileDirName, getLevels, getDirContent, calculateDirSize};