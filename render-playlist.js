
module.exports = function(title, content){

    return `
        <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="style.css">
        <title>${title}</title>
        <style>
        body{
            margin: auto;
            width: 1000px;
        }
        header{
            height: 100px;
            width: 100%;
            margin: auto;
            text-align: center;
            font-style: italic;
            font-size: 2rem;
            color: white;
            background-color: darkred;
            
        }
        aside{
            float: left;
            list-style-type: none;
            width: 200px;
            height: auto;
            padding:20px
        }
        main{
            text-align: center;
            display: block;
            width: 300px;
            margin: auto;
        }
        nav{
            display: inline-block;
            padding: 10px;
            width: 100%;
            border: solid 1px black;
        }
        </style>
    </head>
    <body>
        
        <header>
            <h2>My playlist</h2>
        </header>
        <nav>
            <ul>
                <li><a href="/playlists/add-playlist">Add Playlist</a></li>
                <li><a href="/bands/add">Add Band</a></li>
                <li><a href="/bands">Top 10 charts</a></li>
            </ul>
        </nav>
        <aside width="200px">
            <h3>Other playlists!</h3>
            ${content}
        </aside>
        <main>
            <h1>Top 10 charts</h1>
            
        </main>
        <footer>
            <h4>&copy;Fridas Playlist</h4>
        </footer>


        <script src="main.js"></script>
    </body>
    </html>
    `;



}