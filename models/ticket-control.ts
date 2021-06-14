 import path from 'path';
 import fs from 'fs';

// import { hoy, tickets, ultimo, ultimos4 } from '../db/data.json';

class Ticket {
     numero: number;
     escritorio: string;

    constructor(numero: number, escritorio: string) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    ultimo: number;
    hoy: number;
    tickets: Array<Ticket>;
    ultimos4: Array<Ticket>;

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }

    init() {
        // Leer data del json
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if (hoy === this.hoy) {

            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;

        } else {
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
        // console.log("DB_JSON",this.toJson);
    }

    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, '');
        this.tickets.push(ticket);

        this.guardarDB();

        return 'Ticket ' + ticket.numero;

    }

    atenderTicket(escritorio: string) {

        // No tenemos ticket
        if (this.tickets.length === 0) {
            return null;
        }

        const ticket = this.tickets.shift();
        
        ticket!.escritorio = escritorio;
        
        this.ultimos4.unshift(ticket!);

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();

        return ticket;

        
    }
}

export default TicketControl;