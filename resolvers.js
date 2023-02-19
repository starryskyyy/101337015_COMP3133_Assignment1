const Employee = require('./models/Employee');
const User = require('./models/User');


exports.resolvers = {
    Query: {
        getEmployees: async (parent, args) => {
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            try {
                return await Employee.findById(args.id);

            } catch (err) {
                if (!args.id) {
                    throw new Error(`ID field can not be empty`)
                }
                else if (err.name === 'CastError') {
                    throw new Error(`Invalid employee id`)
                }
                throw new Error(`An error occurred while getting the employee`)
            }
        },

        login: async (parent, args) => {
            try {
                const user = await User.findOne({ username: args.username })

                if (user && user.password === args.password) {
                    return `User ${user.username} logged in successfully`
                } else {
                    return "Invalid username or password"
                }
            } catch (err) {
                return JSON.stringify(err.message)
            }
        }
    },

    Mutation: {
        addEmployee: async (parent, args) => {
            try {
                let newEmp = new Employee({
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,
                    salary: args.salary,
                });


                return await newEmp.save()

            } catch (err) {
                if (!args.firstname || !args.lastname || !args.email || !args.gender || !args.salary) {
                    throw new Error(`Fields cannot be empty`)
                }
                if (err.code === 11000) {
                    const duplicateKey = Object.keys(err.keyPattern)[0];
                    throw new Error(`User with this ${duplicateKey} already exists`)
                } else if (err.name === 'ValidationError') {
                    if (err.errors.salary) {
                        throw new Error('Salary cannot be negative')
                    }
                    throw new Error(`Invalid email format`)
                } else {
                    throw new Error('An error occurred while creating the user')
                }
            }
        },
        updateEmployee: async (parent, args) => {

            if (!args.firstname || !args.lastname || !args.email || !args.gender || !args.salary) {
                throw new Error(`Fields cannot be empty`)
            }

            try {

                return await Employee.findOneAndUpdate(
                    {
                        _id: args.id
                    },
                    {
                        $set: {
                            firstname: args.firstname,
                            lastname: args.lastname,
                            email: args.email,
                            gender: args.gender,
                            salary: args.salary
                        }
                    }, { new: true }
                )

            } catch (err) {

                if (!args.id || err.name === 'CastError') {
                    throw new Error(`Employee does not exists`);
                }
                if (err.code === 11000) {
                    const duplicateKey = Object.keys(err.keyPattern)[0];
                    throw new Error(`Employee with this ${duplicateKey} already exists`)
                } else {
                    throw new Error('An error occurred while creating the user')
                }
            }
        },
        deleteEmployee: async (parent, args) => {
            if (!args.id) {
                throw new Error( 'ID can not be empty');
            }
            try{
                return await Employee.findByIdAndDelete(args.id)
            }
            catch(err){
                if (err.name === 'CastError') {
                    throw new Error(`Employee does not exists`)
                }
                throw new Error(`An error occurred while getting the employee`)
            }
        },

        signup: async (parent, args) => {

            try {
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: args.password
                })

                return await user.save()
            } catch (err) {

                if (!args.username || !args.password || !args.email) {
                    throw new Error(`Fields can not be empty`)
                }
                else if (err.code === 11000) {
                    const duplicateKey = Object.keys(err.keyPattern)[0];
                    throw new Error(`User with this ${duplicateKey} already exists`)

                } else if (err.name === "ValidationError") {
                    throw new Error(`Invalid email format`)
                } else {
                    throw new Error('An error occurred while creating the user')
                }
            }
        }
    }
}