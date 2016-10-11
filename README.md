#CounterDraft WebApp and API
Backend & web app code for all CounterDraft

#Running the project locally / development.
1. Download postgre from https://www.postgresql.org/download/
2. Create database counter and copy the master_config.js file in the /config directory, save it in the same dir and name it local_config.js .
3. Add a new database config:
	module.exports = {
	    database: {
	        "user": "postgres",
	        "password": "postgres",
	        "database": "counter",
	        "host": "localhost",
	        "port": 5432,
	        "dialect": "postgres"
	    },
	    environment: 'development',
	    migration_run: false
	};
	This file is used to override any master configs for your local enviroment.
	note - migration_run needs to be set to false the first time you run the project.
4. Install npm via brew. 
	'brew install node'
5. Install all npm libs via the root directory of project. (where the package.json file is located)
	'npm install'
6. Run the project with the following command:
	'npm start'
7. The project should create all the tables and relationships. Now run the querys on the counter database, located in scripts/testData.sql.
8. Run the project with the following command:
	'npm start'
9. You can comment out the migration_run property in your local_config.js if you dont want migrations to try to run.

#Running the project in production.


[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

