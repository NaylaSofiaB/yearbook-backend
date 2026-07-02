import express from 'express'; // importa o Express usando ES Modules
import alunosRouter from './routes/alunos.js';

const app = express(); // cria a aplicação Express
const PORT = 3000; // porta onde o servidor vai rodar localmente

app.use(express.json()); 

// rota GET na raiz — responde com JSON
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date()})
})

app.use('/alunos', alunosRouter);

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;