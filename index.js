const fs = require("fs");
const path = require("path");

let BASE_PATH = "";
let EXPORTED_BASE_PATH = "";

const main = async () => {
  try {
    BASE_PATH = process.argv[2];
    EXPORTED_BASE_PATH = process.argv[3];

    if (!BASE_PATH) {
    // if (!BASE_PATH || !EXPORTED_BASE_PATH) {
      console.log(
        "Specify the root directory of the analyzed project and the directory of the exported project. Example: 'node index.js C:\\Users\\documents\\MeuProjeto C:\\Users\\documents\\MeuProjetoExportado'"
      );
      return;
    } else {
      console.log("Scanning file structure ...");
      const listAllfiles = getListAllfiles(BASE_PATH);

      console.log("Exporting files ...");
      converFilesToTXT(listAllfiles);

      console.log("Done");
    }
  } catch (e) {
    console.log(e);
  }
};

const getListAllfiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach((file) => {
    let actualPath = dirPath + "/" + file;
    
    if (fs.statSync(actualPath).isDirectory()) {
      createMirroredDirectoryIfItDoesNotExists(actualPath);
      arrayOfFiles = getListAllfiles(actualPath, arrayOfFiles);
    } else { 
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
};

const createMirroredDirectoryIfItDoesNotExists = (directoryPath) => {
  let mirroredPath = replaceBasePath(directoryPath);
  fs.mkdirSync(mirroredPath);
}

const converFilesToTXT = (listAllfiles) => { 
  listAllfiles.forEach((file) => {
    fs.copyFile(file, replaceBasePath(file) + ".txt", err => {
      if (err) throw err;
    });
  })
};

const replaceBasePath = (filePath) => {
  return filePath.toString().replace(BASE_PATH, EXPORTED_BASE_PATH);
}

main();

/**
 * TODO: mkdirSync(): delete or ignore directory once it already exists
 */

