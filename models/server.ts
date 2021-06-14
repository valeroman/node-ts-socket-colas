import express, { Application } from 'express';
import { createServer, Server} from 'http';
import { Socket } from 'socket.io';
// import * as socketIo from 'socket.io';
import { socketController } from '../sockets/controller'


import cors from 'cors';


class SocketServer {

    // propiedades
    private app: Application;
    private port: string;
    private paths = {};
    private server: Server;
    private io: Socket;
    // private io: socketIo.Server;
    
    

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '7011';
        this.server = createServer(this.app);
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
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        // this.app.use(this.paths.auth, authRoutes);
    }

    sockets() {
        this.io.on('connection', socketController);

        
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('servidor corriendo en puerto ', this.port);
        })
    }
}

export default SocketServer;