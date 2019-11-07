const objectId = require('mongodb').ObjectId;
const renderHtml = require('./render-html');

module.exports = async function(app){

    app.get('/bands', async function(req,res){

        try {
            const data = await app.bands.find().toArray();

            let html = data.reverse().map(function(band){
                return `
                    <h2>${band.name}</h2>  
                    <p>${band.song[0]}</p>
                    <p>${band.song[1]}</p>
                    <p>${band.song[2]}</p>
                    
                    <a href= "/bands/delete/${band._id}">Delete</a>
                    <a href= "/bands/edit/${band._id}">Edit</a>
                    <hr>
                `;
            });

            res.send(renderHtml('My playlist',html.join('')));

        } catch (error) {
            res.send('no data');
        }
    });

    app.get('/bands/add', async function(req,res){
        res.sendFile(__dirname + '/add.html');
    });

    app.post('/bands/add', async function(req,res){
        try {
            await app.bands.insertOne(req.body);
            res.redirect('/bands');

        } catch (error) {
            res.send('no band was added');
        }
    });

    app.get('/bands/delete/:id', async function(req,res){
        try {

            let id = req.params.id;
            console.log(id);
            await app.bands.deleteOne({"_id": objectId(id)});
            res.redirect("/bands");

            
        } catch (error) {
            res.send(error.message);
        }
    });

    app.get('/bands/edit/:id', async function(req,res){

        try {

            const id = req.params.id;
            const band = await app.bands.findOne({"_id": objectId(id)});

            let html = `
            <form action="/bands/update" method="post">
                <input type="text" name ="name" value="${band.name}" placeholder="name">
                <br>
                <input type="text" name ="song" value="${band.song[0]}" placeholder="song1">
                <br>
                <input type="text" name ="song" value="${band.song[1]}" placeholder="song2">
                <br>
                <input type="text" name ="song" value="${band.song[2]}" placeholder="song3">
                <br>
                <input type = "hidden" name ="id" value ="${id}">
                <input type="submit" value="save">
            </form>
            `;
            res.send(renderHtml("Edit My Playlist", html));
        } catch (error) {
            res.send("error");
        }
        
    });

    app.post('/bands/update', async function(req,res){

        try {
            
            const id = req.body.id;
            const body = req.body;
            delete body.id;
            await app.bands.updateOne({"_id": objectId(id)},{$set:body});
            res.redirect("/bands")
            

        } catch (error) {
            res.send("error");
        }

    });

    


}