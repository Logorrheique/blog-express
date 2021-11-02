//export all routes as modules
module.exports = {
    createPost : require('./createPost'),
    login: require('./login'),
    logout: require('./logout'),
    main: require('./main'),
    profile: require('./profile'),
    sendPost: require('./sendPost'),
    feed : require('./feed'),
    managePost : require('./managePost'),
 }