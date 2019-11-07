const express = require('express');
const mongo = require('mongodb').MongoClient;

const conString = "mongodb+srv://frijoh01:MiJa123@first-vi93c.mongodb.net/test?retryWrites=true&w=majority";
let app;
makeConnection();

async function makeConnection(){
    const con = await mongo.connect(conString,{useNewUrlParser: true, useUnifiedTopology: true});

    const db = await con.db('my-playlists');
    const col = await db.collection('bands');
    const col2 = await db.collection('playlists');

    app = express();
    app.use(express.urlencoded({extended:false}));
    app.use(express.static("public"));
    app.listen(3500,function(){console.log('port:3500')});

    app.bands = col;
    app.playlists = col2;
    require('./router')(app);
    require('./router-playlist')(app);
}