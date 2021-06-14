"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import { hoy, tickets, ultimo, ultimos4 } from '../db/data.json';
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
        this.init();
    }
    get toJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };
    }
    init() {
        // Leer data del json
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if (hoy === this.hoy) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }
        else {
            this.guardarDB();
        }
    }
    guardarDB() {
        const dbPath = path_1.default.join(__dirname, '../db/data.json');
        fs_1.default.writeFileSync(dbPath, JSON.stringify(this.toJson));
        // console.log("DB_JSON",this.toJson);
    }
    siguiente() {
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, '');
        this.tickets.push(ticket);
        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }
    atenderTicket(escritorio) {
        // No tenemos ticket
        if (this.tickets.length === 0) {
            return null;
        }
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;
        this.ultimos4.unshift(ticket);
        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1);
        }
        this.guardarDB();
        return ticket;
    }
}
exports.default = TicketControl;
//# sourceMappingURL=ticket-control.js.map