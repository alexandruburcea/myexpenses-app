// X00134917 - Alexandru Burcea 
// 3rd Year Softwar Project - Tu Dublin Tallaght 2020 

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Connect to MongoDB 

mongoose.connect("mongodb://localhost:27017/", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//  Connection Message on the console

db.once('open', function(){
	console.log('Database is connected!');
});

// User Schema 

var userSchema =	new Schema({
	email:			{type: String, unique: true, required: false},
	username:		{type: String, unique: true, required: true},
	password:		{type: String, required: true}
});

console.log(userSchema);

// Balance Schema

var balanceSchema =	new Schema({
	total:			{type: Number, required: true},
	user:			{type: String, required: true}
});

// Expense Schema

var expenseSchema =	new Schema({
	name:			{type: String, required: true},
	date:			{type: Date, default: Date.now},
	amount:			{type: Number, required: true},
	category:		{type: String, required: true},
	username:		{type: String, required: true}
});

// Deposit Schema

var depositSchema =	new Schema({
	date:			{type: Date, default: Date.now},
	amount:			{type: Number, required: true},
	description:	{type: String},
	username:		{type: String, required: true}
});

// Unique Check for the Sign Up Form 

userSchema.plugin(uniqueValidator, {message: 'This {PATH} is already taken, please choose another.'});

// Create the Models

var Balance = mongoose.model('Balance', balanceSchema);
var Expense = mongoose.model('Expense', expenseSchema);
var Deposit = mongoose.model('Deposit', depositSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
	db,
	Balance,
	Expense,
	Deposit,
	User
}
