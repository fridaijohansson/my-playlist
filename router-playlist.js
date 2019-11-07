const objectId = require('mongodb').ObjectId;
const renderHtml = require('./render-playlist');

module.exports = async function(app){
    app.get('/tt', async function(req,res){

        res.send("tt");

    })
    app.get('/playlists', async function(req,res){

        try {
            const data = await app.playlists.find().toArray();

            let html = data.reverse().map(function(playlist){
                return `
                    <li><a href="/bands/${playlist.name}">${playlist.name}</a></li>  
                    
                    <a href= "/bands/delete/${playlist._id}">Delete</a>
                    <a href= "/bands/edit/${playlist._id}">Edit</a>
                    <hr>
                `;
            });

            res.send(renderHtml('My playlist',html.join('')));

        } catch (error) {
            res.send('no data');
        }
    });
 
    app.get('/playlists/add-playlist', async function(req,res){
        res.sendFile(__dirname + '/add-playlist.html');
    });
    app.post('/playlists/add-playlist', async function(req, res){
        try {
            await app.playlists.insertOne(req.body);
            res.redirect('/bands');

        } catch (error) {
            res.send('no playlist was added');
        }
    });


    app.get('/playlists/delete-playlist/:id', async function(req,res){
        try {

            let id = req.params.id;
            console.log(id);
            await app.playlists.deleteOne({"_id": objectId(id)});
            res.redirect("/bands");

            
        } catch (error) {
            res.send(error.message);
        }
    }); 
}
