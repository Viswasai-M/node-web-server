const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
// this one moved after maintenance because site is under maintenance and we do not want anything to be displayed so the public folder
// public folder like help will also not executable
//app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  // res.send('<h1>Hello Express!</h1>');
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;

console.log(log);
fs.appendFile('Server.log', log + '\n', (error)=>{
  if(error){
    console.log('unable to append to server.log')
  }
})
next();
  });
// app.use((req, res) =>{
//   res.render('maintenance.hbs', {
//   pageTitle: 'maintenance',
//   welcomeMessage: 'under maintenance'
//  });
// });

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
});
app.use(express.static(__dirname + '/public'));

  hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
  });

app.get('/', (req, res) => {
  res.render('home.hbs', {
  pageTitle: 'Home Page',
  welcomeMessage: 'welcome to my website'
 });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
  pageTitle: 'About Page',

});
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
  pageTitle: 'Projects'
  // welcomeMessage: 'welcome to my website'
 });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
