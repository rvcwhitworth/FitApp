var bookshelf = require('./schema.js').bookshelf;

module.exports.User = bookshelf.Model.extend({
	tableName: 'Users'
});

module.exports.Exercise_Plan = bookshelf.Model.extend({
	tableName: 'Exercise_Plans'
});

module.exports.Diet_Plan = bookshelf.Model.extend({
	tableName: 'Diet_Plans'
});

module.exports.Spotter = bookshelf.Model.extend({
	tableName: 'Spotters'
});

module.exports.Chat_Room = bookshelf.Model.extend({
	tableName: 'Chat_Rooms'
});

module.exports.Daily_Record = bookshelf.Model.extend({
	tableName: 'Daily_Records',
	hasTimestamps: true
});

module.exports.Personal_Record = bookshelf.Model.extend({
	tableName: 'Personal_Records'
});