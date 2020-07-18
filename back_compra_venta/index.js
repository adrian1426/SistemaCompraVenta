import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('port', process.env.PORT || 3001);

app.listen(3001, () => {
  console.log(`Server on port ${app.get('port')}`);
});