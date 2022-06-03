import express from 'express';
import path from 'path';
import router from './router.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.resolve(process.cwd(), 'views'));

app.use(express.static(path.resolve(process.cwd(), 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
