/* let options = {
            validate : true,
            stats : true,
            }
const mdLinks = (path, options) => {


} */

let path = require('path'),fs = require('fs');

const findFilesInDir = (startPath, filter) => {

  let results = [];

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  let files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFilesInDir(filename, filter)); //recurse
    }
    else if (filename.indexOf(filter) >= 0) {
      console.log('-- found: ', filename);
      results.push(filename);
    }
  }
  return results;
}

module.exports = findFilesInDir;

console.log(findFilesInDir('./', '.md'))  
