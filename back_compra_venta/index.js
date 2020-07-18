import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import routes from './src/routes';

const app = express();
const pathPublic = path.join(__dirname, 'public');
const bdUrl = `mongodb://localhost:27017/dbsistema_compra_venta`;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(pathPublic));
app.use('/api', routes);

app.set('port', process.env.PORT || 3001);

mongoose.Promise = global.Promise;
mongoose.connect(bdUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log('conectado a la base de datos');
  })
  .catch(error => {
    console.log('error de conexión: ', error);
  });

app.listen(3001, () => {
  console.log(`Server on port ${app.get('port')}`);
});