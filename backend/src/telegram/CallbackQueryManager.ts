import prisma from "../prisma/connect";

/**
 * Класс для работы с callback
 */
export class CallbackQueryManager {

    private _query: string = '';
    private _path:string = '';
    private _params:{[key:string]:string} = {};
    private _id: number = -1;
    private readonly TTL:number = 1000 * 60 * 60 * 24 * 7; // 7 days

    get query(): string {
        return this._query;
    }

    get path(): string {
        return this._path;
    }

    get params(): {[key:string]:string} {
        return this._params;
    }

    async getQueryFromDb(id:number|string){
        if (typeof id === 'string') id = parseInt(id);
        if (isNaN(id)) return;
        this._id = id;
        await prisma.telegram_commands.findUnique({
            where: {
                id: id,
            }
        }).then(command => {
            if (!command) return;
            this._query = command.query;
            this._path = this._getPath();
            console.log(this._path)
            this._params = this._getParams();
        })
        return
    }

    async createQueryInDb(path:string, params:{[key:string]:string} = {}){
        this._params = params;
        this._path = path;
        this._query = this._buildQuery();


        const command = await prisma.telegram_commands.create({
            data: {
                query: this._query,
                TTL: new Date(Date.now() + this.TTL),
            }
        })

        this._id = command.id;
        return this._id
    }


    /**
     * Возвращает путь запроса
     */
    private _getPath():string{
        return this._query.split('?')[0];
    }

    /**
     * Возвращает параметры запроса
     */
    private _getParams():{[key:string]:string}{
        const params = this.query.split('?')[1];
        if (!params) return {};
        const paramsArray = params.split('&');
        const paramsObject:{[key:string]:string} = {};
        paramsArray.forEach(param => {
            const [key, value] = param.split('=');
            paramsObject[key] = value;
        })
        return paramsObject;
    }

    async setParams(params:{[key:string]:string}){
        this._params = params;
        this._query = this._buildQuery();
        await this.updateQueryInDb(this._id, this._query);
    }

    async setParam(key:string, value:string){
        this._params[key] = value;
        this._query = this._buildQuery();
        await this.updateQueryInDb(this._id, this._query);
    }

    private _buildQuery():string{
        let query = this._path;
        const params = Object.keys(this._params);
        if (params.length){
            query += '?';
            params.forEach((param, index) => {
                query += `${param}=${this._params[param]}`;
                if (index < params.length - 1) query += '&';
            })
        }
        return query;
    }

    async setPath(path:string){
        this._path = path;
        this._query = this._buildQuery();
        await this.updateQueryInDb(this._id, this._query);
    }

    private async updateQueryInDb(id:number, query:string){
        if (id === -1) return;

        prisma.telegram_commands.update({
            where: {
                id: id
            },
            data: {
                query: this._buildQuery()
            }
        })
    }

    get id():number{
        return this._id;
    }

    async deleteQueryInDb(){
        if (this._id === -1) return;
        try {
            await prisma.telegram_commands.delete({
                where: {
                    id: this._id
                }
            })
        } catch (e) {

        }
    }

    async deleteExpiredQueries(){
        await prisma.telegram_commands.deleteMany({
            where: {
                TTL: {
                    lte: new Date()
                }
            }
        })
    }

}