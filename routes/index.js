const userRoute = require('./userRoute');

module.exports = function(app){
    app.get('/', (req, res) => {
        res.send("Home page");
   });
   app.use('/users',userRoute);
}