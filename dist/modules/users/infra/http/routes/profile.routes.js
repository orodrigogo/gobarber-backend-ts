"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ProfileController_1 = __importDefault(require("../controllers/ProfileController"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var profileRouter = express_1.Router();
var profileController = new ProfileController_1.default();
profileRouter.use(ensureAuthenticated_1.default);
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);
exports.default = profileRouter;
