const mongo = require('mongoose');

async function connect() {
    try {
        await mongo.connect('mongodb+srv://durand:mungvip1@atlascluster.vrnmd.mongodb.net/MERN?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connection Succes!!!');
    } catch (error) {
        console.log('Connection Failed!!!');
    }
}

module.exports = { connect };

