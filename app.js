require('colors')

const menu = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const archivo = require('./helpers/guardarArchivo')

const main = async () => {
    let opt = ''
    const tareas = new Tareas()

    const ext = archivo.leer()

    if(ext) {
        tareas.cargarTareas(ext)
    }

    do {
        opt = await menu.Menu();

        switch (opt) {
            case 1:
                const desc = await menu.leerInput('Descripcion: ')
                tareas.crearTarea(desc)
            break
            case 2:
                // console.log(tareas.listadoArr);
                const resp = tareas.listadoCompleto()
                console.log(resp);
            break
            case 3:
                tareas.listarPenCom('COMPLETADO')
            break
            case 4:
                tareas.listarPenCom('PENDIENTE')
            break
            case 5:
                const ids = await menu.mostrarListCheck(tareas.listadoArr)
                tareas.toogleCompletadas(ids)
            break
            case 6:
                const id = await menu.listarBorrar(tareas.listadoArr)
                if(id != 0) {
                    const confirmacion = await menu.confirmar('¿Esta seguro?')
                    if(confirmacion) 
                        tareas.borrarTarea(id)
                }
            break
        }

        archivo.guardar(JSON.stringify(tareas.listadoArr))

        await menu.pausa()

    } while (opt != 0)
}

main()
