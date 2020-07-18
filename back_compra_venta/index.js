import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();
const pathPublic = path.join(__dirname, 'public')

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(pathPublic));

app.set('port', process.env.PORT || 3001);

app.listen(3001, () => {
  console.log(`Server on port ${app.get('port')}`);
});