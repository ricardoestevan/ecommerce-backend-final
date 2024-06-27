require('../models')
const sequelize = require('../utils/connection');
const testingUser = require('./createData/user');


const testMigrate = async () => {
    try {
        await sequelize.sync({ force:true });
        console.log("DB reset exit");
        await testingUser()
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

testMigrate();