const   middle     = require('./src/routes/middleware'),
        bodyParser = require('body-parser'),
		express    = require('express'),
		FP         = require("express-fileupload"),
        app        = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({'limit':'1mb'}));
app.disable('x-powered-by');
app.use(FP({limits: { fileSize: 50 * 1024 * 1024 }}));
app.use(express.static('src/img'));

const register     = require('./src/routes/register'),
	  login        = require('./src/routes/login'),
	  posts        = require('./src/routes/posts'),
	  post         = require('./src/routes/post'),
	  user         = require('./src/routes/user');

app.all('*', function(_, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, auth, Content-Length, X-Requested-With');
	next();
});

app.post('/login', login.validateDataLogin, login.loginUser);
app.post('/register', register.validateDataReg, register.registerUser);
app.get('/posts', middle.authHeader, middle.validSign, posts.getPosts);
app.get('/post/:id', middle.authHeader, middle.validSign, post.getPost);
app.post('/post', middle.authHeader, middle.validSign, post.validatePostData, post.createPost);
app.get('/user', middle.authHeader, middle.validSign, user.getDataUser);
app.patch('/user/nameChange', middle.authHeader, middle.validSign, user.validateNameData, user.changeName);
app.patch('/user/emailChange', middle.authHeader, middle.validSign, user.validateEmailData, user.changeEmail);
app.patch('/user/passChange', middle.authHeader, middle.validSign, user.validatePassData, user.changePass);
app.delete('/post/:id', middle.authHeader, middle.validSign, post.deletePost);
app.patch('/post/:id', middle.authHeader, middle.validSign, post.validatePostData, post.editPost);


app.listen(process.env.SERVER_PORT || 3002, ()=> {
	console.log(`Servidor en localhost puerto ${process.env.SERVER_PORT || 3002}`);
});