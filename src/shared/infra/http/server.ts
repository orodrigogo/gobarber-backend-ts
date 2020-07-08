import 'reflect-metadata';
import 'dotenv/config'; // variaveis de ambiente

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors'; // pacote instalado para tratar os erros assyncronos cair no middleware de tratamento

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());

// Para mostrar a imagem.
app.use('/files', express.static(uploadConfig.uploadsFolder));

// Coloquei depois da rota que carrega arquivo, para não bloquear quando solicitar várias imagens.
app.use(rateLimiter);

app.use(routes);

// captura de erros do celebrate.
app.use(errors());

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
