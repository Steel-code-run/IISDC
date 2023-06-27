import {Configuration, OpenAIApi} from "openai";
import {directions} from "./directions";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});


class Openai{
    private openai: OpenAIApi;


    constructor() {
        this.openai = new OpenAIApi(configuration);
    }

    public getCompletion = async (prompt:string)=> {
        const completion = await this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 2500
        });

        return completion.data.choices[0].text;
    }

    public getDirectionsFromText = async (text:string)=>{
        const condition =`У тебя есть следующие направления: ${directions.join(", ")}
        Определи четко дублируя названия данных тебе направлений и дай ответ в формате массива с двойными ковычками.
        К каким из 3 данных направлениям больше всего относится следующий текст:`

        let prompt = condition + text;

        // удаление переносов строк и табуляций лишних пробелов
        prompt = prompt.replace(/\n/g, " ");
        prompt = prompt.replace(/\t/g, " ");
        prompt = prompt.replace(/\s+/g, " ");


        // если текст > 2048 символов, то обрезаем

        if (prompt.length > 2048){
            prompt = prompt.slice(0, 3048);
        }

        const completion = await this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500,
            echo: false,
        })

        let result:any = completion.data.choices[0].text;
        if (!result){
            return [];
        }
        result = result.replace(/\n/g, " ");
        result = result.replace(/\t/g, " ");
        result = result.replace(/\s+/g, " ");

        // смена одинарных ковычек на двойные
        result = result.replace(/'/g, '"');

        // обрезка от первого [ до последнего ]
        result = result.slice(result.indexOf("[") , result.lastIndexOf("]")+1);

        result = JSON.parse(result);

        // исключения ненужных направлений
        result = result.filter((item:string)=>{
            return directions.includes(item);
        })
        return result;
    }

    public getDeadlineFromText = async (text:string)=>{
        const condition =`Твоя задача вытащить из текста дедлайн в ISO формате, если даты нет то напиши False. 
        Исходя из условия проанализируй следующий текст: `

        let prompt = condition + text;

        // удаление переносов строк и табуляций лишних пробелов
        prompt = prompt.replace(/\n/g, " ");
        prompt = prompt.replace(/\t/g, " ");
        prompt = prompt.replace(/\s+/g, " ");


        // если текст > 2048 символов, то обрезаем

        if (prompt.length > 2048){
            prompt = prompt.slice(0, 3048);
        }

        const completion = await this.openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 500,
            echo: false,
        })

        let result:any = completion.data.choices[0].text;

        if (!result){
            throw new Error("Не удалось распознать дедлайн");
        }

        return new Date(result);

    }
}

const openai = new Openai();

export default  openai;