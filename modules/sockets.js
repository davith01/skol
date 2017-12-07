var express = require('express'),
	http    = require('http'),
	app     = express(),
	server  = http.createServer(app),
	io      = require('socket.io')(server);

// Variable `usernames` para los usuarios conectados
var usernames = {};
var chat;

// Estableciendo conexi�n con cliente
io.sockets.on('connection', function(socket){

    // Agregando y actualizando un usuario
    socket.on('adduser', function(username){

        if (usernames[username]) {

            socket.emit('error-name');

        } else {

            socket.username = username;

            usernames[username] = socket.username;

            console.log(socket.username);

            data = [socket.username, usernames];

            io.sockets.emit('message', data);

        }
    });

    // Cuando envian un mensaje
    socket.on('sendmessage', function(message){

        console.log(message);

        // Verificando que no envien URLs
        message = chat.links(message);

        console.log(message + 'chat.links');

        // Verificando si es necesario agregar un meme
        message = chat.memes(message);

        console.log(message + 'chat.memes');

        // Agregando informaci�n de hora

        //message = message + '<small> - (' + chat.hour() + ')</small>';

        var data = [socket.username, message, chat.hour()];

        console.log(data);

        io.sockets.emit("newmessage", data);
    });


    socket.on('disconnect', function(){
        delete usernames[socket.username];


        data = [usernames, socket.username];


        console.log(data);


        io.sockets.emit('useroffline', data);
    });


});


// Namespace para los memes y los links
chat = {

    links: function(message){

        var pattern = new RegExp(/(\b(https?|ftp|file):\/\/([-A-Z0-9+&@#%?=~_|!:,.;]*)([-A-Z0-9+&@#%?\/=~_|!:,.;]*)[-A-Z0-9+&@#\/%=~_|])/ig);

        if(pattern.test(message))
            message = '&nbsp-No URLs-&nbsp';

        return message;
    },

    // cargando c�digo correspondiente al meme para que el front lo resuelva
    memes: function(text){

            while (text.toString().indexOf('#y') != -1)
                text = text.toString().replace('#y','#1');

            while (text.toString().indexOf('#l') != -1)
                text = text.toString().replace('#l','#2');

            while (text.toString().indexOf('#k') != -1)
                text = text.toString().replace('#k','#3');

            while (text.toString().indexOf('#t') != -1)
                text = text.toString().replace('#t','#4');

            while (text.toString().indexOf('#s') != -1)
                text = text.toString().replace('#s','#5');

            while (text.toString().indexOf('#ds') != -1)
                text = text.toString().replace('#ds','#6');

            while (text.toString().indexOf('#f') != -1)
                text = text.toString().replace('#f','#7');

            while (text.toString().indexOf('#c') != -1)
                text = text.toString().replace('#c','#8');

            while (text.toString().indexOf('#no') != -1)
                text = text.toString().replace('#no', '#9');

            while (text.toString().indexOf('#g') != -1)
                text = text.toString().replace('#g','#10');

            return text;
    },

    hour: function(){

        var stamp = new Date();
        var hours;
        var mins;
        var time;
        var hours = stamp.getHours();

        if (hours >= 12) {
            time = " P.M.";
        } else {
            time = " A.M.";
        }

        if (hours > 12) {
            hours -= 12;
        }

        if (hours == 0) {
            hours = 12;
        }

        mins = stamp.getMinutes();

        if (mins < 10) {
            mins = "0" + mins;
        }

        return hours + ":" + mins + time;
    }
};
