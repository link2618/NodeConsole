const fs  = require('fs');

const archivo = {}

const dir = `./db/data.json`

archivo.guardar = (data) => {

    fs.writeFile(dir, data, (err) => {
        if (err) {
            reject(err);
            return
        } 
    })

}

archivo.leer = () => {
    if(!fs.existsSync(dir))
        return null;
    
    const info = fs.readFileSync(dir, {encoding: 'utf-8'});
    const data  = JSON.parse(info);
    return data
} 

module.exports = archivo