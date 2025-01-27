import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/db.js';  
import peliculaRoutes from './src/pelicula/peliculaRoutes.js'; 
import actorRoutes from './src/actor/actorRoutes.js';  

const port = process.env.PORT || 4000; // Usa el puerto dinámico de Render o 4000 si no está disponible
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.all('/', (req, res) => {
  return res.status(200).send('Bienvenido al cine Iplacex');
});

app.use('/api', peliculaRoutes);
app.use('/api', actorRoutes);

await client.connect()
  .then(() => {
    console.log('Conectado al clúster');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log('Ha ocurrido un error al conectar al clúster de Atlas', e.message);
  });
