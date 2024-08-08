import app from './app';
import { port } from './config';
import database from './database';

app.listen(port);
console.log('Server listen on port', port);
