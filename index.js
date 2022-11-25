import {httpServer} from './src/main.js';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;

//Server
const server = httpServer.listen(port, () => {
    console.log(`Server listening to: ${server.address().port}`);
});

server.on('error', error => console.log(`Error: ${error}`));