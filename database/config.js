var knex = require('knex')({
	client: 'mysql',
	connection: {
		host: 'turba-aenean.ccl2ixzx9sdm.us-east-2.rds.amazonaws.com',
		user: 'aenean',
		password: 'hrnyc12aenean',
		database: 'fitapp',
		charset: 'utf8'
	}
});

module.exports.knex = knex;