const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'First name is required'], 
        minlength: [2, 'First name must be at least 2 characters long'] 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required'], 
        minlength: [2, 'Last name must be at least 2 characters long'] 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true, 
        match: [/.+@.+\..+/, 'Please enter a valid email address'] 
    },
    phoneNumber: { 
        type: String, 
        required: [true, 'Phone number is required'], 
        match: [/^\d{10}$/, 'Phone number must be 10 digits long'] 
    },
    role: { 
        type: String, 
        enum: {
            values: ['HR', 'Employee'],
            message: 'Role must be either HR or Employee'
        },
        required: [true, 'Role is required']
    },
    employeeId: { 
        type: String, 
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        minlength: [6, 'Password must be at least 6 characters long'] 
    }
});

userSchema.methods.comparePassword = function (password) {
    return password === this.password;
};

module.exports = mongoose.model('User', userSchema);
