var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var fs = require('fs');

var url = 'mongodb://localhost:27017/CheckList';

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var resultArray = [];
    mongo.connect(url, function(err, db, next){
        assert.equal(null, err);
        var cursor = db.collection('tasks').find();
        cursor.forEach(function(doc,err) {
           assert.equal(null, err);
            resultArray.push(doc);
        }, function() {
            db.close();
            res.render('index', {tasks: resultArray});
        });
    });
});
    

router.post('/add', function(req, res, next) {
    var newTask = {
        task: req.body.new_task,
        done: 'false'
    };
    mongo.connect(url, function (err, db) {
        assert.equal(null, err);
        db.collection('tasks').insertOne(newTask, function(err, result) {
            assert.equal(null, err);
            db.close();
            res.redirect('/');
        });
    });
});


router.post('/save', function(req, res, next) {
    var taskText = req.body.text;
    var done = req.body.checked;
    mongo.connect(url, function(err, db) {
        db.collection('tasks').updateOne({'task': taskText},{'task': taskText, 'done': done}, function(err, result) {
            assert.equal(null, err);
            db.close; 
            res.redirect('/');
        });
    });
});


router.post('/delete', function(req, res, next) {
    mongo.connect(url, function(err, db) {
        db.collection('tasks').remove({'done':'true'}, function(err, result) {
            assert.equal(null, err);
            db.close; 
            res.redirect('/');
        });
    });
});




module.exports = router;










