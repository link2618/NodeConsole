const moment = require("moment");

const Tarea = require("./Tarea");

class Tareas {
    _listado = {}

    constructor() {
        this._listado = {}
    }

    get listadoArr() {
        const array = []

        Object.keys(this._listado).forEach(key => {
            array.push(this._listado[key])
        })

        return array
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea
    }

    cargarTareas(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    listadoCompleto() {
        let imp = ''

        this.listadoArr.forEach((tarea, index) => {
            const {conpletadoEn, desc} = tarea
            imp += `\n${index+1}. ${desc} :: ${conpletadoEn? 'Completado'.green: 'Pendiente'.red}`
        })

        return imp
    }

    listarPenCom (opcion) {
        const tareasCP = this.listadoArr
        let imp = ''

        if(opcion === 'COMPLETADO') {
            tareasCP.forEach((tarea, index) => {
                const {conpletadoEn, desc} = tarea
                conpletadoEn ? imp += `\n${index+1}. ${desc} :: ${conpletadoEn? conpletadoEn.green: ''}`: ''
            })
        }

        if(opcion === 'PENDIENTE') {
            tareasCP.forEach((tarea, index) => {
                const {conpletadoEn, desc} = tarea
                conpletadoEn == null ? imp += `\n${index+1}. ${desc} :: ${conpletadoEn? '': 'Pendiente'.red}`:''
            })
        }

        console.log(imp);
    }

    borrarTarea(id) {
        if(this._listado[id]) {
            delete this._listado[id]
            console.log('Tarea borrada con exito');
        }
    }

    toogleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id]
            if(!tarea.conpletadoEn) {
                let fecha = new Date()
                fecha = this.formatearFecha(fecha)
                tarea.conpletadoEn = fecha.valueOf()
            }
        })

        this.listadoArr.forEach(element => {
            const {id} = element
            if( !ids.includes(id) ) {
                this._listado[id].conpletadoEn = null
            }
        });
    }

    formatearFecha(date) {
        if (date == null || date == undefined || date == "" || date == " ") {
            return ""
        }
        let fechaReturn = moment(date).format('DD-MM-YYYY HH:mm:ss')
        return fechaReturn;
    }
}

module.exports = Tareas