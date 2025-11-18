import fetchUniplyData from '../db/fetchData.js'
import exportToCSV from '../utils/csvExporter.js'
import query from '../db/query.js'
import sendEmail from '../email/sendEmail.js'
import config from '../config/index.js'


async function cronJob() {

    try{
        console.log("Cron job started...");
        
        // Fetch query result
        const result = await fetchUniplyData("studentprofiles", query)
        if (result.length === 0){
            console.log("No data found");
            return
        }
        // console.log(result)
        

        // Convert result to csv
        const data = await exportToCSV(result)

        if (config.mailSendEnabled){
            console.log("Sending email...");
            data.filePath ? sendEmail(data.filePath) : sendEmail(null, data.csvString) // send inline CSV
        }
        else {console.log("Data is fetched, Mail send is stopped.", data);}

        // Send mail , csv as attachment
        // sendEmail(csvString)
    }
    catch (error){
        console.error("Error occured in cron job..:", error);
    }

}


if (config.cronJobEnabled){
    console.log('Starting cron job...');
    cronJob()
}else{
    console.log('Cron job is stopped, check environment variables.');
    process.exit(1)   
}
