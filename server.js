const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 4000;
const app =  express();
const routes = express.Router();


// Set up a whitelist and check against it:
// var whitelist = ['http://localhost:3000/', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
app.use(cors());

let Data = require('./models/Schema');


//BodyParser middleware
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//COnnect to mongoDB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('****************************__________MongoDB connected__________******************'))
    .catch(err => console.log(err));

const port = process.env.PORT || PORT;

//Serves static assets(on heroku)
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

routes.route('/').get((req, res)=> {
    Data.find(function(err, data){
        if(err){
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

routes.route('/year-list').get((req, res) => {
    let result = [];
    Data.find(function(err, data){
        if(err){
            console.log(err);
        } else {
            for(var i=0; i<data.length;i++){//Adding years in array
                result.push(data[i].year);
            }
            result = result.filter( function( item, index, inputArray ) {//Removing duplicate years
                return inputArray.indexOf(item) == index;
            }).sort();
                
            res.json(result);
        }
    });
});

routes.route('/:id').get((req, res) => {//get all data for a given id
    let id = req.params.id;
    Data.findById(id, function(err, data) {
        res.json(data);
    });
});

routes.route('/comments/:id').get((req, res) => {//fetch all comments for a given id
    let id = req.params.id;
    Data.findById(id, function(err, data) {
        if(data.data_comments == undefined)
            res.json("No comments found");
        else
            res.json(data.data_comments);
    });
});

routes.route('/year/:year').get((req, res) => {//get all data for a given year
    let year = req.params.year;
    Data.find({year: year}, function(err, data) {
        res.json(data);
    });
});

routes.route('/add').post(function(req, res) {//todoRoutes
    let data = new Data(req.body);// todo, Todo
    data.save()//todo
        .then(data => {//todo
            res.status(200).json({'data': 'data added successfully'})//todo
        })
        .catch(err => {
            res.status(400).json('adding new data failed');
        });
});

routes.route('/add/comments/:id').post((req, res) => {
    Data.findById(req.params.id, function(err, data) {
        data.data_comments = req.body.data_comments
    })
});

routes.route('/update/:id').post((req, res) => {
    Data.findById(req.params.id, function(err, data) {
        if(!data)//if data is not found
            res.status(404).send('data is not found');
        else
            data.year = req.body.year;
            data.data_name = req.body.data_name;
            data.data_latitude = req.body.data_latitude;
            data.data_longitude = req.body.data_longitude;
            data.data_coverImgUrl = req.body.data_coverImgUrl;
            data.data_dpImgUrl = req.body.data_dpImgUrl;
            data.data_location = req.body.data_location;
            data.data_capacity = req.body.data_capacity;
            data.data_summary = req.body.data_summary;
            data.data_matchDate = req.body.data_matchDate;
            data.data_team1 = req.body.data_team1;
            data.data_team2 = req.body.data_team2;
            data.data_winner = req.body.data_winner;

            data.save().then(data => {
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update failed")
            });
    });
});

app.use('/data', routes);//todos

app.listen(port, 
    () => console.log(`***************************_______Server strted on port: ${port}_______****************`)
);