import path, {dirname} from "path";
import {readdir} from 'fs/promises'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getNamesParsers = async () => {
    const parsersNode = path.join(__dirname, '../', 'src/node');
    return await getDirectories(parsersNode)

}

const getDirectories = async source =>
    (await readdir(source, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)