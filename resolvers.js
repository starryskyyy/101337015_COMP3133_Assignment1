const Employee = require('./models/Employee');
const User = require('./models/User');

exports.resolvers = {
    Query: {
        getEmployees: async (parent, args) => {
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            return Employee.findById(args.id)
        },
        login: async (parent, args) => {
            try {
                const user = await User.findOne({ username: args.username });
                if (user && user.password === args.password) {
                    return `User ${user.username} logged in successfully`;
                } else {
                    return "Invalid username or password";
                }
            } catch (err) {
                return err.message;
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
                    salary: args.salary
                });
                return await newEmp.save();
            } catch (err) {
                return JSON.stringify(err.message)
            }
        },
        updateEmployee: async (parent, args) => {
            console.log(args)
            try {
                console.log(args)
                if (!args.id) {
                    return;
                }

                const employee = await Employee.findOneAndUpdate(
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
                );

                return employee;
            } catch (err) {
                return JSON.stringify(err.message);
            }
        },
        deleteEmployee: async (parent, args) => {
            console.log(args)
            if (!args.id) {
                return JSON.stringify({ status: false, "message": "No ID found" });
            }
            return await Employee.findByIdAndDelete(args.id)
        },

        signup: async (parent, args) => {

            try {
                if (!args.username || !args.password || !args.email) {
                    return { message: null, error: `Fields can not be empty` };
                }
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: args.password
                });
                await user.save();
                return { message: 'User created successfully', error: null };
            } catch (err) {
                
                if (err.code === 11000) {
                    const duplicateKey = Object.keys(err.keyPattern)[0];
                    return { message: `User with this ${duplicateKey} already exists`, error: null };
                } else if (err.name === "ValidationError") {
                    return { message: null, error: `Invalid email format` };
                } else {
                    return { message: null, error: "An error occurred while creating the user" };
                }
            }
        }
    }
}