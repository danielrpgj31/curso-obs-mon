/*app.ts*/
import express, { Express } from 'express';

const PORT: number = parseInt(process.env.PORT || '8081');
const app: Express = express();

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/trace', (req, res) => {
  const name = req.query.name;
  res.send(`Hello ${name}`);
});

app.listen(PORT, () => {
  console.log(`Listening for requests on http://localhost:${PORT}`);
});
