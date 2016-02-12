var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({

     email: {type: String, required: true},
	 password: {type: String, required: true}

});

var User = mongoose.model('User', userSchema);

// Make this available to our other files
module.exports = User;