const { client, CLIENT_ID } = require("../index");
function checkAuthenticated(req, res, next) {
    let token = req.cookies['session-token'];
    let user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token, audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify()
        .then(() => {
            req.user = user;
            console.log("USER VERIFIED");
            next();
        })
        .catch((err) => {
            res.redirect('/');
            //not verified so -> /login
        });

}
exports.checkAuthenticated = checkAuthenticated;
