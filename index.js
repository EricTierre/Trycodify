const http = require('http')
const express = require('express')
const path = require('path')
const app = express()
const passport = require('passport')

const hostname = '127.0.0.1';
const port = process.env.PORT || 12345;

// Configurações 
  const handlebars = require('express-handlebars');
  const bodyparser = require('body-parser')
  const session = require('express-session')
  const flash = require('connect-flash')

  //session
    app.use(session({
      secret: 'camarasecreta',
      resave: true,
      saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(flash())

  //Middlewire
    app.use((req, res, next) => {
      res.locals.success_msg = req.flash('success_msg')
      res.locals.error_msg = req.flash('error_msg')
      res.locals.error = req.flash('error')
      next()
    }) 

  // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')

  // Body parser
    app.use(bodyparser.urlencoded({extended: false}))
    app.use(bodyparser.json())

  // Public
    app.use(express.static(path.join(__dirname, 'public')))


//Rotas 
    app.get('/', function(req, res){
        res.render('home/index')
    })
  
    
app.listen(port, () => {
  console.log('Server is running')
})
/*
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});*/

