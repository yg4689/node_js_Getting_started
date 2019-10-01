var express = require('express');
var mongodb = require('mongodb');
var path = require('path');
var router = express.Router();

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.static(__dirname + '/public'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

app.get('/mongodb', function(req, res, next) {
  mongodb.MongoClient.connect('mongodb://johnpreetha4:LockTon@312@ds117866.mlab.com:17866/heroku_ck1rc6j8', function(err, client) {
    if(err) throw err;
      var db = client.db('heroku_ck1rc6j8');
      var Routes = db.collection('Routes');
      useNewUrlParser: true
      Routes.find({ frequency : { $gte: 0 } }).sort({ name: 1 }).toArray(function (err, docs) {
      if(err) throw err;
        res.render('pages/mongodb', {results: docs});
      });
      client.close(function (err) {
        if(err) throw err;
      });
    });//end of connect
});//end app.get

app.listen(PORT, function() {
  console.log(`Listening on Port ${PORT}`);
});
