const fs = require("fs");
const path = require("path");

let BASE_PATH = "";
let EXPORTED_BASE_PATH = "";

const main = async () => {
  try {
    //Picking up user inputs arguments
    BASE_PATH = process.argv[2];
    EXPORTED_BASE_PATH = process.argv[3];

    //Verifying if both paths were provided
    if (!BASE_PATH || !EXPORTED_BASE_PATH) {
      throw Error("In the line command specify the root directory of the analyzed project and the directory of the exported project. \n \
        Example: 'node index.js C:\\Users\\documents\\MeuProjeto C:\\Users\\documents\\MeuProjetoExportado'");

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

/**
 * Recursively analyze the project structure
 * @param {*} dirPath Base path of original project directory
 * @param {*} arrayOfFiles Array of all file paths in the original project 
 * @returns Array of all file paths in the original project 
 */
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

/**
 * Creates the respective subdirectory in the copied project structure
 * @param {*} directoryPath The corresponding directory path in the copyied project
 */
const createMirroredDirectoryIfItDoesNotExists = (directoryPath) => {
  let mirroredPath = replaceBasePath(directoryPath);
  fs.mkdirSync(mirroredPath);
};

/**
 * Exports all the original files in .txt format into the copied project
 * @param {*} listAllfiles Array of original file paths
 */
const converFilesToTXT = (listAllfiles) => {
  listAllfiles.forEach((file) => {
    fs.copyFile(file, replaceBasePath(file) + ".txt", (err) => {
      if (err) throw err;
    });
  });
};

const replaceBasePath = (filePath) => {
  return filePath.toString().replace(BASE_PATH, EXPORTED_BASE_PATH);
};

main();