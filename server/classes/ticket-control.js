const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');

        // Cada día nuevo reiniciamos proceso
        if (data.hoy === this.hoy) {
            // Estamos en el mismo día, continuamos
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;

        } else {
            // Es un nuevo día, reiniciamos
            this.reiniciarConteo();
        }
    }


    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        // Rompemos que los objetos son pasados por referencia en js
        // con ello evitamos posibles efectos colaterales
        // Lo hacemos, sacando el primer elemento del array
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); // Borrar el primero

        // Creamos una nueva instancia de clase Ticket
        let atenderTicket = new Ticket(numeroTicket, escritorio);

        // Añadimos instancia al array de uĺtimos 4, lo añadimos el primero
        this.ultimos4.unshift(atenderTicket);

        // Si he,os superado los 4 elementos, sacamos el último
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); // boorar último
        }

        console.log('ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    siguiente() {

        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${ this.ultimo } `;
    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo } `;
    }
    getUltimos4() {
        return this.ultimos4;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se ha inicializado el sistema');
        this.grabarArchivo();
    }

    grabarArchivo() {
        // Grabamos info en archivo de texto
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }

        // Convertimos json en string para grabar
        let jsonDataString = JSON.stringify(jsonData);

        fs.writeFileSync('./server/data/data.json', jsonDataString);


    }


}



module.exports = {
    TicketControl
}