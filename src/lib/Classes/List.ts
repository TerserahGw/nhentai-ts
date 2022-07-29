import { IListData, IDoujinInfo } from '../../Types'
import axios from 'axios'
import { load } from 'cheerio'
import { parseDoujinInfo } from '../../Parser'

export class List implements IListData {
    constructor(
        public title: string,
        public id: string,
        public cover: string | null,
        public url: IListData['url']
    ) {}

    /**
     * Gets the info of a doujin
     * @returns The info of the doujin
     */
    public async getDoujin(): Promise<IDoujinInfo> {
        return await axios
            .get<string>(this.url)
            .then(({ data }) =>
                parseDoujinInfo(
                    load(data),
                    this.url.split('nhentai.')[1].split('/')[0] as 'to'
                )
            )
            .catch((err) => {
                throw new Error(err.message)
            })
    }
}
