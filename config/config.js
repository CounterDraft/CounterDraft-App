module.exports = {
	environment:  process.env.MODE || 'development',
	server: {
		ip: 'localhost',
		port: process.env.PORT || 8080
	},
	database: {
		host: 'localhost',
		port: 3306,
		user: '',
		password: '',
		database: 'counter',
		table: 'log',
		level: 'info',
		multipleStatements: true
	},
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