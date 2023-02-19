const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true
  },
  lastname: {
    type: String,
    alias: 'surname',
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    maxlength: 50,
    //Custom validation
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'],
    trim: true,
    lowercase: true
  },
  salary: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (value < 0.0){
         throw new Error("Negative Salary aren't real.");
      }
    }
  },
  created: { 
    type: Date,
    default: Date.now,
    alias: 'createdat'
  },
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;