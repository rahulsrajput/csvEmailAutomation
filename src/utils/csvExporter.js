import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { Parser } from 'json2csv'
import config from "../config/index.js";


async function exportToCSV(data){

    // Convert JSON → CSV

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(data);
    
    if (Boolean(config.serverStorage)){
        const folder = "./exports";
        if (!existsSync(folder)){
            mkdirSync(folder);
        }
        const filePath = `${folder}/export.csv`
        writeFileSync(filePath, csv);
        console.log("CSV exported to",filePath);
        return {filePath}
    }
    
    // No file saving → return csv string
    return {
        csvString: csv
    };
}


export default exportToCSV