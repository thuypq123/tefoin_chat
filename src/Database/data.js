
const mongoose = require('mongoose');
const URL = "mongodb+srv://socket_io:thuy1234@cluster0.uhkg4.mongodb.net/testProject?retryWrites=true&w=majority";

async function connect() {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log('Connected database from mongodb');
        })
    }catch(error){console.log("Connect Failed");};
}
module.exports = { connect }
