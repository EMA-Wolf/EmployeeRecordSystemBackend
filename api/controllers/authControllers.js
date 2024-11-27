const Employee   = require('../models/Employee')
const bcrypt = require('bcrypt')

// Login a employee
const loginContoller = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        console.log('No email or password provided');
        return res.status(400).json({msg: 'Please enter all fields'})
    }

    try{
        let employee = await Employee.findOne({email})

        if(!employee){
            console.log('No employee found with this email');
            return res.status(404).json({msg: 'No employee found'})
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        
        if(!isMatch){
            console.log('Incorrect Email or Password');
            return res.status(401).json({msg: 'Incorrect Email or Password'})
        }
        
            // Add attendance for the current date
            const currentDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
            const existingDate = employee.attendance.find(entry => entry.date === currentDate);

            if (!existingDate) {
                // Add a new entry if the current date is not already present
                employee.attendance.push({ date: `${currentDate}`, count: 1 }); 
            }else {
                // Increment the count if already logged in on the same day
                existingDate.value = 1;
            }

            // Save the updated employee record
            await employee.save();

        console.log(`${email} Login successful`);
        // res.status(200).json({msg: 'Login successful'})
        res.status(200).json({
            msg: 'Login successful',
            employee: {
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                position: employee.position,
                department: employee.department,
                attendance: employee.attendance
            }
        });

    }catch(err){
        console.log("An error occurred while trying to login to employee", err)
        return res.status(500).json({msg: 'Server Error'})
    }
}


// Create a new employee
const SignupContoller = async (req, res) => {
    const {firstName,lastName, email, password, phoneNumber,position,department, attendance} = req.body
    console.log(`firstName: ${ firstName } || lastName: ${ lastName } || email: ${ email } || password ${ password } || phoneNumber: ${ phoneNumber }`)

    if (!firstName || !lastName || !email || !password){
        console.log('Please enter some credentials')
        return res.status(400).json({msg: 'Please enter all fields'})
    }

    try {
        let employee = await Employee.findOne({email})
        
        if(employee){
            console.log('Employee already exists')
            return res.status(400).json({msg: 'Employee already exists'})
        }

        employee = new Employee({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            position,
            department,
            attendance  
        })

       
        employee.password =  await bcrypt.hash(password,13)

        await employee.save();

        console.log(`Employee with ${email} registered successfully`)
        res.status(201).json({msg: 'Employee registered successfully'})

    }catch (err) {
        console.log('An error occurred while trying to create an employee', err)
        return res.status(500).json({msg: 'Server Error'})
    }
}

module.exports = {loginContoller, SignupContoller}