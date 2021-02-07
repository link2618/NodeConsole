const inquirer = require('inquirer')
require('colors')

const menu = {}

const options = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea realizar?',
        choices: [
            {
                value: 1,
                name: '1. Crear tarea'
            },
            {
                value: 2,
                name: '2. Listar tarea'
            },
            {
                value: 3,
                name: '3. Listar tareas completadas'
            },
            {
                value: 4,
                name: '4. Listar tareas pendientes'
            },
            {
                value: 5,
                name: '5. Completar tareas'
            },
            {
                value: 6,
                name: '6. Borrar tarea'
            },
            {
                value: 0,
                name: '0. Salir'
            },
        ],
    }
]

const pausable = [
    {
        type: 'input',
        name: 'enter',
        message: `Precione ${'ENTER'.green} para continuar`,
    }
]

menu.Menu = async () => {
    console.log('========================='.blue);
    console.log('  Seleccione una opcion'.blue);
    console.log('=========================\n'.blue);

    const { option } = await inquirer.prompt(options)

    return option
}

menu.pausa = async () => {
    await inquirer.prompt(pausable)
}

menu.leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if(value.length == 0)
                    return 'Ingrese un valor'
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

menu.listarBorrar = async (tareas) => {
    const choices = tareas.map((tarea, i) => {
        const { id, desc } = tarea
        return {
            value: id,
            name: `${i+1}. ${desc}`
        }
    })
    choices.unshift({
        value: 0,
        name: '0. Cancelar'
    })
    const delet = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(delet)
    return id
}

menu.confirmar = async (message) => {
    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta)
    return ok
}

menu.mostrarListCheck = async (tareas) => {
    const choices = tareas.map((tarea, i) => {
        const { id, desc } = tarea
        return {
            value: id,
            name: `${i+1}. ${desc}`,
            checked: (tarea.conpletadoEn) ? true: false
        }
    })
    const check = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(check)
    return ids
}

module.exports = menu