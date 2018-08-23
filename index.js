const path = require('path'); 
const fs = require('fs');
 const findFilesInDir = (startPath, filter) => {
  let results = [];
  if (!fs.existsSync(startPath)) {
    console.log("No encontrado ", startPath);
    return;
  }
  let files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    let filename = path.join(startPath, files[i]);
    let stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      results = results.concat(findFilesInDir(filename, filter)); 
    }
    else if (filename.indexOf(filter) >= 0) {
      console.log('Encontrado: ', filename);
      results.push(filename);
    }
  }
  readLinks(results);
  return results;
} 
/* module.exports = findFilesInDir; */

const readLinks =(results)=>{
   for (let i = 0; i < results.length; i++) {
let regexp = /(\()(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?(\))/g;
fs.readFile(results[i],'utf-8', (error,datos)=>{
  if(error){
    throw error;
  } else {
    let link = datos.match(regexp);
    console.log(link);
    }
  }) }
}

 console.log(findFilesInDir('./', '.md'))   






/* let options = {
            validate : true,
            stats : true,
            }
const mdLinks = (path, options) => {


} */

