const express = require('express');
const { createServer } = require('http');
const morgan = require('morgan');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const cors = require('cors');
const redis = require('redis');

dotenv.config();

(async () => {
	const client = redis.createClient({
		url: 'redis://default:P2Olkc8GkFt9EHGDT5LnmOAlw6WRB5LMYAzCaMoGxGI=@llevaloo-redis.redis.cache.windows.net:6379',
	});
	client.on('error', (err) => console.log('Redis Client Error', err));
	client.connect().then(() => {
		console.log('Creo que me connecte');
	});
})();

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
	cors: {
		origin: true,
		credentials: true,
	},
});

app.use(morgan('dev'));
app.use(cors());

io.on('connection', (client) => {
	console.log('ID del cliente conectado: ', client.id);
});

app.get('/', (req, res, next) => {
	if (res.statusCode === 200) {
		res.send({ hello: 'world' });
	}
});

app.get('/prueba', (req, res, next) => {
	if (res.statusCode === 200) {
		res.send({ hello: 'prueba' });
	}
});

httpServer.listen(process.env.PORT, () => {
	console.log(`Escuchando en el puerto ${process.env.PORT}`);
});
