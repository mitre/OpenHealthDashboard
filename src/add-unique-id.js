const glob = require('glob');
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

const buildDir = 'src/data/build/';

console.log(`Adding unique ID's to every object in the JSON files, and writing them to ${buildDir}`);

traverseData = (data) => {
  if (typeof data === 'object') {
    if (data == undefined) {
      return;
    }

    if (Array.isArray(data)) {
      data.forEach(d => traverseData(d));
    } else {
      data['id'] = uniqid();

      const entries = Object.entries(data);
      for (const [key, value] of entries) {
        traverseData(value);
      }
    }
  }
}

glob("src/data/*.json", (err, files) => {
  if (err) {
    console.log(err);
  }

  files.forEach(file => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
      }

      const obj = JSON.parse(data);
      traverseData(obj);

      const final = JSON.stringify(obj);
      JSON.stringify(obj);

      if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir)
      }
      fs.writeFileSync(`${buildDir}${path.basename(file)}`, final);
    })
  })
})
