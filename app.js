const express = require('express');
const path = require('path');
const exp = require('constants');
const bdyparser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');
mongoose.connect('mongodb://localhost:27017/contact-page', {useNewUrlParser: true, useUnifiedTopology: true});
const app = express();
const port = process.env.PORT || 80;


//mongos schema
const contact = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    // address: String,
    // more: String,
  });


const contactpage = mongoose.model('contact', contact);

//express stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//setting paths
// const templatepath = path.join(__dirname, '../templates/views')
// const partialpath = path.join(__dirname, '../templates/partials')

//hbs stuff
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', path.join(__dirname, '../templates/views'));
// hbs.registerPartials(partialpath);

//end points
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact', params);
})

app.get('/account', (req, res) => {
    const params = {}
    res.status(200).render('account', params);
})
app.post('/account', (req, res) => {
    var mydata = new contactpage(req.body);
    mydata.save().then(()=> {
        res.send('response has ben saved to db');
    }).catch(()=> {
        res.send('response not saved');
    })
    // res.status(200).render('contact.pug', params);
})

app.get('/product', (req, res) => {
    const params = {}
    res.status(200).render('product', params);
})

app.get('/product_details', (req, res) => {
    const params = {}
    res.status(200).render('product_details', params);
})

//SERVER START
app.listen(port, ()=> {
    console.log('succesfully running')
})
