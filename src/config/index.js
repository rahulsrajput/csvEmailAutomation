import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
    'MONGO_URI',
    'EMAIL_USER',
    'EMAIL_PASS',
    'EMAIL_TO',
    'EXPORT_FORMAT',
    'SERVER_STORAGE',
    'CRON_JOB_ENABLED',
    'MAIL_SEND_ENABLED',
    'MAIL_HOST',
    'MAIL_PORT',
    'DB_NAME',
    'COLLECTION_NAME',
    'EMAIL_CC'
]

for (const key of requiredEnvVars) {
    if (!process.env[key]) {
        console.error(`Error: Missing required environment variable ${key}`);
        process.exit(1);
    }
}

const config = {
    mongoUri: process.env.MONGO_URI,
    email: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        emailUser: process.env.EMAIL_USER,
        emailPass: process.env.EMAIL_PASS,
        emailTo: process.env.EMAIL_TO.split(',').map(function (email) { return email.trim() }),
        emailCC: process.env.EMAIL_CC ?
            process.env.EMAIL_CC.split(',').map(function (email) { return email.trim() })
            : [],
    },
    exportFormat: process.env.EXPORT_FORMAT || 'csv',
    serverStorage: process.env.SERVER_STORAGE === "true",
    cronJobEnabled: process.env.CRON_JOB_ENABLED === "true",
    mailSendEnabled: process.env.MAIL_SEND_ENABLED === "true",
    dbName: process.env.DB_NAME,
    collectionName: process.env.COLLECTION_NAME,
}

export default config;