import {createButton} from "./functions/Button";

export const buttons = {
    main: ()=>createButton('К основной клавиатуре', 'main'),
    logout: ()=>createButton('Выйти из аккаунта', 'logout'),
    settings: ()=>createButton('К настройкам', 'settings'),
    grants: ()=>createButton('К грантам', 'grants'),
    settings_directions: ()=>createButton('Настроить получаемые направления по грантам', 'settings_directions'),
    settings_work_time: ()=>createButton('Настроить время работы', 'settings_work_time'),
    settings_work_time_start_add_1_hour: ()=>createButton('+', 'settings_work_time_start_add_hour',{hour: 1}),
    settings_work_time_start_decrease_1_hour: ()=>createButton('-', 'settings_work_time_start_add_hour',{hour: -1}),
    settings_work_time_end_add_1_hour: ()=>createButton('+', 'settings_work_time_end_add_hour', {hour: 1}),
    settings_work_time_end_decrease_1_hour: ()=>createButton('-', 'settings_work_time_end_add_hour', {hour: -1}),
    settings_work_time__holder: (time:string)=>createButton(time, 'settings_work_time'),

}

export const main_keyboard = async () => [
    [
        await buttons.settings(),
    ],
    [
        await buttons.grants(),
    ]
]


export const settings_keyboard = async () => [
    [
        await buttons.logout(),
    ],
    [
        await buttons.main()
    ],
    [
        await buttons.settings_directions(),
    ],
    [
        await buttons.settings_work_time(),
    ]
]

export const grants_keyboard = async () => [
    [
        await buttons.main(),
    ],
    [
        await createButton('Получить с 1 по 5', 'grants_get', {
            from: 1,
            to: 5
        })
    ],
    [
        await createButton('Получить с 6 по 10', 'grants_get', {
            from: 6,
            to: 10
        })
    ],
    [
        await createButton('Получить с 11 по 15', 'grants_get', {
            from: 11,
            to: 15
        })
    ]
]

export const settings_work_time_keyboard = async (time1:string,time2:string) => [
    [
        await buttons.main(),
    ],
    [
        await buttons.settings_work_time_start_decrease_1_hour(),
        await buttons.settings_work_time__holder(time1),
        await buttons.settings_work_time_start_add_1_hour(),
    ],
    [
        await buttons.settings_work_time_end_decrease_1_hour(),
        await buttons.settings_work_time__holder(time2),
        await buttons.settings_work_time_end_add_1_hour(),
    ],
]