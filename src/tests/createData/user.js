const User = require('../../models/User')


const testingUser = async() => {
    const data = {
        firstName: 'Antonio',
        lastName : 'Gonzalez',
        email    : 'agonzalez@gmail.com',
        password : '000111',
        phone    : '9564443249',
    }
    
    await User.create(data)
}

module.exports = testingUser
