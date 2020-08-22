var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', function() {

    console.log('Conectado al servidor');

});

socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});

socket.on('estadoActual', (resp) => {

    console.log(resp);
    label.text(resp.actual);

});


$('button').on('click', function() {

    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});