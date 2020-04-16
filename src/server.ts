import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'; // pacote instalado para tratar os erros assyncronos cair no middleware de tratamento

import routes from './routes';
import uploadConfig from './config/upload';

import './database';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());

// Para mostrar a imagem.
app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

// tratativa dos erros tem que vir depois das rotas
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // Verificando se o erro é gerado e vem do AppError que eu criei
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Servidor online na porta 3333!');
});
