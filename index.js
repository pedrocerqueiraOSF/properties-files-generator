
var xlsx = require('node-xlsx');
const excelFilePath = '../Properties_HK_translated_02022022.xlsx';
var fs = require('fs');
let dir = './properties';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var data = xlsx.parse(excelFilePath); // parses a file

for (let j = 0; j < data.length; j++) {
    let sheet = data[j].data;
    let auxArray = [];
    for (let i = 1; i < sheet.length; i++) {
        let element = sheet[i];
        if(element[0] !== undefined){
            if(element[2] !== undefined){
                auxArray.push(element[0] + "=" + element[2])
                //console.log(element[0] + "=" + element[2])
            }
            else{
                auxArray.push(element[0]);
                //console.log(element[0])
            }
        }else{
            auxArray.push(null);
        }
    }
    let content = auxArray.join('\n');
    fs.writeFileSync(__dirname + dir.substring(1) + '/' + data[j].name + '.properties', content, "utf8");
}


