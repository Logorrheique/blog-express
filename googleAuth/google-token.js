const { client, CLIENT_ID } = require("../index");

//add user  in Db
const addUser = require('../db/addProfile');
function getGGToken(req, res) {
    let token = req.body.token;
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token, audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.id = payload.sub;
        user.email = payload.email;
        user.name = payload.name;
        user.picture = payload.picture;
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success');
            req.user = user;
            addUser(user);
            console.log("TOKEN SEND");
        })
        .catch(console.error);
}
module.exports = getGGToken;