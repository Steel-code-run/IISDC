import {createButton} from "./functions/Button";

export const buttons = {
    main: ()=>createButton('К основной клавиатуре', 'main'),
    logout: ()=>createButton('Выйти из аккаунта', 'logout'),
    settings: ()=>createButton('К настройкам', 'settings'),
    grants: ()=>createButton('К грантам', 'grants'),
    settings_directions: ()=>createButton('Настроить получаемые направления по грантам', 'settings_directions'),
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