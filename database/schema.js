var knex = require('./config.js').knex;
var bookshelf = require('bookshelf')(knex);

bookshelf.knex.schema.hasTable('Users').then((exists) => {
	if ( !exists ) {
		bookshelf.knex.schema.createTable('Users', (e) => {
			e.increments('id').primary();
			e.text('username').notNullable();
			e.text('password').notNullable();
			e.text('fullName').notNullable();
			e.text('email'); // optional
			e.text('type').notNullable(); // options: 'client' or 'trainer'
			e.text('profile_data', 'longtext').nullable();
		});
	}
});

bookshelf.knex.schema.hasTable('Exercise_Plans').then((exists) => {
	if ( !exists ) {
		bookshelf.knex.schema.createTable('Exercise_Plans', (e) => {
			e.increments('id').primary();
			e.text('name').notNullable(); // e.g. "Ethan's plan"
			e.text('regimen', 'longtext').notNullable(); // stringified object
			e.integer('trainer_id').notNullable();
			e.integer('client_id').notNullable();
			e.foreign('trainer_id').references('Users.id');
			e.foreign('client_id').references('Users.id');
		});
	}
});

bookshelf.knex.schema.hasTable('Diet_Plans').then((exists) => {
	if ( !exists ) {
		bookshelf.knex.schema.createTable('Diet_Plans', (e) => {
			e.increments('id').primary();
			e.text('name').notNullable(); // e.g. "Ethan's plan"
			e.text('diet', 'longtext').notNullable(); // stringified object
			e.integer('trainer_id').notNullable(); 
			e.integer('client_id').notNullable();
			e.foreign('trainer_id').references('Users.id');
			e.foreign('client_id').references('Users.id');
		});
	}
});

bookshelf.knex.schema.hasTable('Spotters').then((exists) => {
	if ( !exists ) {
		bookshelf.knex.schema.createTable('Spotters', (e) => {
			e.increments('id').primary();
			e.integer('trainer_id').notNullable();
			e.integer('client_id').notNullable();
			e.text('type').notNullable(); // ex., 'nutritionist'
			e.foreign('trainer_id').references('Users.id');
			e.foreign('client_id').references('Users.id');
		});
	}
});

bookshelf.knex.schema.hasTable('Chatrooms').then((exists) => {
	if ( !exists ) {
		bookshelf.knex.schema.createTable('Chatrooms', (chatrooms) => {
			chatrooms.increments('id').primary();
			chatrooms.integer('room_id').notNullable(); // Firebase room id
			chatrooms.integer('user_id').notNullable(); // foreign key
			chatrooms.foreign('user_id').references('Users.id');
    });
  }
});

bookshelf.knex.schema.hasTable('Daily_Records').then((exists) => {
	if ( !exists ) {
		bookshelf.knex.schema.createTable('Daily_Records', (record) => {
			record.increments('id').primary();
			record.integer('user_id').notNullable(); // foreign key
			record.text('data', 'longtext').notNullable(); // all user inputs
			record.foreign('user_id').references('Users.id');
    });
  }
});

bookshelf.knex.schema.hasTable('Personal_Records').then((exists) => {
	if ( !exists ) {
		bookshelf.knex.schema.createTable('Personal_Records', (record) => {
      record.increments('id').primary();
			record.integer('user_id').notNullable(); // foreign key
			record.text('data', 'longtext').notNullable(); // all PRs
			record.foreign('user_id').references('Users.id');
    });
  }
});

module.exports.bookshelf = bookshelf;