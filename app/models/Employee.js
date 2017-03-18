'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
	crypto = require('crypto');
	var bcrypt=require('bcrypt-nodejs');


var EmployeeSchema = new Schema({
	EmployeeID: {
		type: Number,
		required: true,
		unique: true
	},
	FirstName: {
		type: String,
		required: false
	},
	LastName: {
		type: String,
		required: true
	},
	Stream: {
		type: String,
		required: false
	},
	Password: {
		type: String,
		required: true
	},
	Salt: String,
	Admin: {
		type: Boolean,
		default: false
	}
}, {
	collection: 'Employee',
	timestamps: true
});

EmployeeSchema.pre('save', function(next) {
 //    var employee = this;

 //    if (!employee.isModified('Password')) return next();

 //    employee.Salt = crypto.randomBytes(16).toString('hex');
	// employee.Password = crypto.pbkdf2Sync(employee.Password, employee.Salt, 1000, 64).toString('hex');
 //    next();
var user=this; 
    if(!user.isModified('Password'))
        return next();
    bcrypt.hash(user.Password,null,null,function(err,hash)
               {
       if(err)
           {
               return next(err);
           }
        user.Password=hash;
        
        next();
    });

});

// EmployeeSchema.methods.comparePassword = function (Password) {
// 	// var hash = crypto.pbkdf2Sync(Password, this.Salt, 1000, 64).toString('hex');
// 	// return this.Password === hash;
//   var user=this;
//     return bcrypt.compareSync(Password,user.Password);


// };
EmployeeSchema.methods.comparePassword = function(Password, callback){
    bcrypt.compare(Password, this.Password, callback)
};


module.exports = mongoose.model('Employee', EmployeeSchema);
