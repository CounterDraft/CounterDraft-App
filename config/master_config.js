module.exports = {
    environment: process.env.MODE || 'development',
    server: {
        ip: 'localhost',
        port: process.env.PORT || 8080
    },
    database: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'counter',
        table: 'server_log',
        level: 'info',
        multipleStatements: true
    },
    log_level: process.env.log_level || 'local',
    email: {
        service: "Gmail",
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
            user: '',
            pass: ''
        }
    }
};
