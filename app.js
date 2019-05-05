const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000;
var app = express()


app.set('view engine', 'hbs')

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page'
//     })
// })

app.use(express.static(__dirname + '/public'))
app.use((request, response, next) => {
    // console.log(`The time now is : ${Date().toString()}`)
    var now = new Date().toString()
    var log = `${now} : ${request.method} , ${request.url}`
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) { console.log('Unable to append to server.log !') }
    })
    next()
})

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return currentYear = new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})


app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to home page',
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle Request'
    })
});

app.get('/profile', (req, res) => {
    res.render('Profile', {
        pageTitle: 'Profile page',
        welcomeMessage: 'Welcome to My Profile'
    })
})


app.listen(port, () => {
    console.log(`server is running at port ${port}`)
});