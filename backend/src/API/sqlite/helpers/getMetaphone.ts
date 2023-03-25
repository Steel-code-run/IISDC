export const getMetaphone = (str:string)=>{

    str = str.toLowerCase()
        .trim()
        .replaceAll(/(йо)|(ио)|(йе)|(ие)/gi,'и')
        .replaceAll(/(о)|(ы)|(я)/gi,'а')
        .replaceAll(/(е)|(ё)|(э)/gi,'и')
        .replaceAll(/ю/gi,'и')

    let strArray = str.split('')
    while (str.search(/(б)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/) >= 0){
        // @ts-ignore
        strArray[str.search(/(б)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/)] = 'п'
        str = strArray.join('')
    }

    while (str.search(/(г)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/) >= 0){
        // @ts-ignore
        strArray[str.search(/(г)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/)] = 'к'
        str = strArray.join('')
    }

    while (str.search(/(в)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/) >= 0){
        // @ts-ignore
        strArray[str.search(/(в)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/)] = 'ф'
        str = strArray.join('')
    }

    while (str.search(/(д)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/) >= 0){
        // @ts-ignore
        strArray[str.search(/(д)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/)] = 'т'
        str = strArray.join('')
    }

    while (str.search(/(ж)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/) >= 0){
        // @ts-ignore
        strArray[str.search(/(ж)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/)] = 'ш'
        str = strArray.join('')
    }

    while (str.search(/(з)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/) >= 0){
        // @ts-ignore
        strArray[str.search(/(з)(б|в|г|д|ж|з|й|к|п|с|т|ф|х|ц|ч|ш|щ)/)] = 'с'
        str = strArray.join('')
    }

    str = str.replaceAll(/б$/gi,"п")
        .replaceAll(/г$/gi,"к")
        .replaceAll(/в$/gi,"ф")
        .replaceAll(/д$/gi,"т")
        .replaceAll(/ж$/gi,"ш")
        .replaceAll(/з$/gi,"с")


    str = str.replaceAll(/(тс|дс|ц)/gi,"ц")

    return str
}