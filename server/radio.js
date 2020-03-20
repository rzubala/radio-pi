import express from 'express';
import bodyParser from 'body-parser'
import routes from './routes'

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

routes(app);

app.listen(port, () => {
    console.log("Media Player Daemon REST Server running on port " + port);
});
