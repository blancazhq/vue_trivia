var path = require('path')
var express = require('express')
var expressVue = require('express-vue')
var app = express();

app.engine('vue', expressVue);
app.set('view engine', 'vue');
app.set('views', path.join(__dirname, '/views'));
app.set('vue', {
    componentsDir: path.join(__dirname, '/views/components'),
    defaultLayout: 'layout'
});


app.get('/', function(req, res){
    var scope = {
        data: {
            title: "Trivia",
            message: 'Hello!',
        },
        vue: {
            components: ['question', 'questions'],
        }
    };
    res.render('index', scope);
});


app.listen(3000);
console.log('Express server listening on port 3000');
