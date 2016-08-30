module.exports = {
    environment: process.env.MODE || 'development',
    npm_package_name: process.env.npm_package_name || 'UNKNOWN',
    server: {
        ip: 'localhost',
        port: process.env.PORT || 8080
    },
    database: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'counter'
    },
    secure_cookies: process.env.secure_cookies || false,
    log_level: process.env.log_level || 'local',
    log_table: 'server_log',
    database_url: process.env.DATABASE_URL || false,
    secret: process.env.secret || '71b6c615-8f93-4b20-8dd7-6e1c5110e583',
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
