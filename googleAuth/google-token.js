const { client, CLIENT_ID } = require("../index");
function getGGToken(req, res) {
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token, audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
    }
    verify()
        .then(() => {
            res.cookie('session-token', token);
            res.send('success');
            console.log("TOKEN SEND");
        })
        .catch(console.error);
}
module.exports = getGGToken;