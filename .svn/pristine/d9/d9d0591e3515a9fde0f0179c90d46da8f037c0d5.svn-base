'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EmployeeLocationSchema = new Schema({
	EmployeeID: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    Location: {
    	type: Schema.Types.ObjectId,
        ref: 'Location',
    	required: true
    }
}, {
    collection: 'EmployeeLocation',
    timestamps: true
});

module.exports = mongoose.model('EmployeeLocation', EmployeeLocationSchema);