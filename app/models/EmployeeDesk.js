'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeDeskSchema = new Schema({
	EmployeeID: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    DeskNo: {
    	type: Schema.Types.ObjectId,
        ref: 'Desk',
    	required: true,
        unique:true
    },
    Wing:{
        
        type: Schema.Types.ObjectId,
        ref: 'Wing',
    	required: true
        
    }
    
}, {
    collection: 'EmployeeDesk',
    timestamps: true
});

module.exports = mongoose.model('EmployeeDesk', EmployeeDeskSchema);
