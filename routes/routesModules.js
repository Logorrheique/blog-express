//export all routes as modules
module.exports = {
    createPost : require('./createPostRoutes'),
    login: require('./loginRoutes'),
    logout: require('./logoutRoutes'),
    main: require('./mainRoutes'),
    profile: require('./profileRoutes'),
    sendPost: require('./sendPostRoutes')
 }