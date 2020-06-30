"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var ProvidersController_1 = __importDefault(require("../controllers/ProvidersController"));
var providersRouter = express_1.Router();
var providersController = new ProvidersController_1.default();
// aplicando o middleware para todas as rotas de agendamentos.
providersRouter.use(ensureAuthenticated_1.default);
providersRouter.post('/', providersController.index);
exports.default = providersRouter;
