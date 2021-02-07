require('colors')

const menu = () => {
    console.log('========================='.blue);
    console.log('  Seleccione una opcion'.blue);
    console.log('=========================\n'.blue);

    console.log(`1. Crear tarea`);
    console.log(`2. Listar tareas`);
    console.log(`3. Listar tareas completadas`);
    console.log(`4. Listar tareas pendientes`);
    console.log(`5. Completar tareas`);
    console.log(`6. Borrar tarea`);
    console.log(`0. Salir`);
}

module.exports = menu