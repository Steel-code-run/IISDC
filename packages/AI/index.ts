import natural from "natural";
import Design from "./directions/Design";
import IT from "./directions/IT";
import Journalism from "./directions/Journalism";
import Pedagogy from "./directions/Pedagogy";
import SocialWork from "./directions/SocialWork";
import {DirectionType} from "@iisdc/types";
import Philology from "./directions/Philology";
import Medicine from "./directions/Medicine";
import Drones from "./directions/Drones";
import drones from "./directions/Drones";
import Biotech from "./directions/Biotech";
import Chemistry from "./directions/Chemistry";
import Geography from "./directions/Geography";
import Tourism from "./directions/Tourism";
import Economy from "./directions/Economy";
import libraryScience from "./directions/libraryScience";
import tourism from "./directions/Tourism";


const porterStemmer = natural.PorterStemmerRu,
    classifier = new natural.BayesClassifier(porterStemmer);


const trainingObjects = [
    Design,
    Tourism,
    IT,
    Journalism,
    Philology,
    Medicine,
    Pedagogy,
    SocialWork,
    Drones,
    Biotech,
    Chemistry,
    Geography,
    Economy,
    libraryScience,
]

let trainingData:any[] =[];
trainingObjects.forEach(obj=>{
    obj.props.forEach(text=> {
        trainingData.push({
            fullText: text,
            direction: obj.name
        })
    })
})


//@ts-ignore
trainingData.forEach(el=>{
    if (el.fullText && el.direction) {
        classifier.addDocument(el.fullText,el.direction)
    }
})

classifier.train()
const classify = (str:string) =>{
    if (str.length < 10) {
        return [DirectionType.Unknown]
    } else{
        let directions = [];
        let classifications = classifier.getClassifications(str)
        let classificationsValuesSum = classifications.reduce((acc, el) => acc += el.value, 0)

        let myClassifications = classifications.map((el)=>
            Object.assign({label:el.label},{proc:el.value / classificationsValuesSum}))
        // console.log(myClassifications)
        // console.log(classificationsValuesSum)

        directions.push(classifications[0].label)
        if (myClassifications?.[1]?.proc > 0.000001)
            directions.push(classifications[1].label)
        if (myClassifications?.[2]?.proc > 0.000001)
            directions.push(classifications[2].label)

        if (directions.length < 1)
            directions.push(DirectionType.Unknown)


        return directions
    }
}


// console.log("Дизайн")
// console.log(classify("Russian Design Cup\nКонкурс для дизайнеров от VK Design Team и DesignLine в трёх направлениях — branding, promo и interfaces. Главный приз — 100 тысяч рублей.\n\nНа протяжении всего конкурса команда будет выбирать лучших участников и рекомендовать их в дизайн-команды ведущих компаний, таких как CreativePeople и «Альфа-Банк»."));

// console.log("Географии")
// console.log(classify("Приём заявок на соискание грантов Русского географического общества на 2022 год начался 16 сентября 2021 года.\n\nСроки приёма заявок\nНа соискание грантов региональных отделений РГО\t16 сентября - 23 октября 2021 года\nНа соискание инициативных грантов\t16 сентября - 1 ноября 2021 года \nНа соискание медиагрантов\t17 февраля - 11 марта 2022 года\nУсловия подачи заявок на гранты РГО\nПодать заявку на грант может любой человек или организация по любой теме, соответствующей списку номинаций.\n\nЗаявки принимаются только через единую электронную систему на сайте grant.rgo.ru. \n\nИспользовать единую электронную систему могут только зарегистрированные пользователи. \n\nКатегории грантов РГО\nИнициативные гранты направлены на поддержку проектов, инициируемых Президентом Общества, членами Попечительского и Управляющего советов, а также советами и комиссиями Общества. \nГранты региональных отделений направлены на реализацию проектов, представляемых (поддержанных) региональными отделениями Общества. Заявки на эти гранты проходят предварительную экспертизу региональных экспертов - после того, как поданы через единую электронную систему на сайте grant.rgo.ru. Если заявка получила высокую оценку региональных экспертов, она считается поддержанной региональным отделением Общества.\nМедиагранты направлены на медиаподдержку проектов РГО из числа региональных и инициативных, а также проектов в сфере популяризации географических знаний и деятельности Общества (самостоятельные медиагранты).\nНоминации\nИнициативные гранты:\n\n- Проведение географических исследований\n\n- Организация экспедиций и путешествий\n\n- Географическое образование и просвещение\n\n- Издательская работа\n\n- Сохранение природного и историко-культурного наследия России, в том числе в рамках программ ЮНЕСКО\n\n- Сохранение редких видов животных\n\n- Молодёжные проекты РГО\n\n- Подводные исследования\n\n- Работа с Фондами РГО\n\n- Популяризация географии\n\nГранты региональных отделений:\n\n- Проведение географических исследований\n\n- Организация экспедиций и путешествий\n\n- Географическое образование и просвещение\n\n- Издательская работа\n\n- Сохранение природного и историко-культурного наследия России, в том числе в рамках программ ЮНЕСКО*\n\n- Сохранение объектов живой природы\n\n- Молодёжные проекты"))

// console.log("Дроны");
// console.log(classify("Дирекция «Аэромобильность» запускает конкурс идей для стартапов, связанных с технологиями беспилотных летательных аппаратов. Три самые интересные инициативы смогут получить финансирование и ресурсы для реализации.\n\nДля участия необходимо отправить на почту aero@mai.ru презентацию с кратким описанием своей идеи (шаблон презентации). Тема письма: БЛАбаттл. \n\n Дедлайн подачи заявок — 3 марта 2023.\n\nКонкурсантам, прошедшим отборочный этап, предстоит защищать свои презентации 7 марта 2023 года перед экспертной группой. В первую очередь, будут оцениваться востребованность концепции, её проработанность и реализуемость.\n\nАвторам трёх успешно защищённых идей будет оказана грантовая поддержка в виде сертификатов на 300, 150 или 100 тысяч рублей в зависимости от занимаемого места.\n\nГрант можно потратить на обучение или стажировку, приобретение ПО, закупку комплектующих для аппаратов и других расходных материалов. Работать над проектами студенты будут совместно с кураторами от Дирекции «Аэромобильность».\n\n27 апреля 2023 года состоится финальная защита работ перед экспертной комиссией. Победителя ждёт содействие в запуске и коммерциализации стартапа, а также приятные бонусы от Дирекции «Аэромобильность»."));

export default classify
