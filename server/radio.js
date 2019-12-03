import express from 'express';
import routes from './routes'

const app = express();
const port = process.env.PORT || 3000

routes(app);

app.listen(port, () => {
    console.log("Media Player Daemon REST Server running on port " + port);
});