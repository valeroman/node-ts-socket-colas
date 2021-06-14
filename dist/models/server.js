"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
// import * as socketIo from 'socket.io';
const controller_1 = require("../sockets/controller");
const cors_1 = __importDefault(require("cors"));
class SocketServer {
    // private io: socketIo.Server;
    constructor() {
        this.paths = {};
        this.app = express_1.default();
        this.port = process.env.PORT || '7011';
        this.server = http_1.createServer(this.app);
        this.io = require('socket.io')(this.server);
        // Middlewares
        this.middlewares();
        // Rutas de la aplicacion
        this.routes();
        // Sockets
        this.sockets();
    }
    middlewares() {
        // CORS
        this.app.use(cors_1.default());
        // Directorio publico
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        // this.app.use(this.paths.auth, authRoutes);
    }
    sockets() {
        this.io.on('connection', controller_1.socketController);
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        });
    }
}
exports.default = SocketServer;
//# sourceMappingURL=server.js.map