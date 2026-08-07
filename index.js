import 'dotenv/config';  
import express from 'express'; // importa o Express usando ES Modules
import cors from 'cors';  
import logger from './middlewares/logger.js';      // importa o middleware de log
import tratarErro from './middlewares/erro.js';  
import alunosRouter from './routes/alunos.js';
import mensagensRouter from './routes/mensagens.js';

const app = express(); // cria a aplicação Express
const PORT = process.env.PORT || 3000;  // lê do .env, com fallback para 3000

app.use(cors()); 
app.use(express.json()); 
app.use(logger);            // 2º — registra log de cada requisição

// rota GET na raiz — responde com JSON
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date()})
})

app.use('/alunos', alunosRouter);
app.use('/mensagens', mensagensRouter);

app.use(tratarErro);

// inicia o servidor localmente — na Vercel essa parte é pulada
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// exporta o app para a Vercel usar como serverless function
export default app;