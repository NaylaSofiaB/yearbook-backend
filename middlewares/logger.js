// Middleware de log — registra cada requisição no terminal
export default function logger(req, res, next) {
  const start = Date.now();
  const metodo = req.method;
  const url = req.originalUrl;
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const agora = new Date().toISOString();
    console.log(
      `[${agora}] ${metodo} ${url} ${status} - ${duration}ms`
    );
  });
  next();
}