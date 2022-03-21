const fs = require("fs");

const main = async () => {
  try {

    if(!process.argv[2]) {
      console.log("Especifique o diretório raíz. Exemplo: 'node index.js C:\\Users\\documents\\MeuProjeto' ");
      return;
    }

    console.log("ARGV:", process.argv[2]);
    const BASE_PATH = process.argv[2];

    const arrayOfFiles = fs.readdirSync(BASE_PATH);
    console.log("arrayOfFiles:");
    console.log(arrayOfFiles);
  } catch (e) {
    console.log(e);
  }
};

main();
