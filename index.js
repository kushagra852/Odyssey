const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const port=8000;
const expressLayout=require('express-ejs-layouts');
const db=require('./config/mongoose');
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./Config/passport')
const flash=require('connect-flash');
const customMware=require('./Config/middleware');
// const sassMiddleware=require('node-sass-middleware');

// app.use(sassMiddleware({
//     src:'/Assets/scss',
//     dest:'/Assets/css',
//     debug:true,
//     outputStyle:'extended',
//     prefix:'/css'
// }));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.set('view engine','ejs');
app.set('views','./Views');
app.use(express.static('./Assets'));

app.use(session({
    name:'codeial',
    //TODO change the secret before deployment in production mode
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
//Use Express Router
app.use('/',require('./Routes/index'));




app.listen(port, function (err){
    if(err)
    console.log("Error in connecting to the Express server");
    console.log(`Server running successfully on port ${port}`);
});