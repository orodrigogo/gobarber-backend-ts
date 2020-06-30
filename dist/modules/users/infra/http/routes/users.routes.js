"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
var UsersController_1 = __importDefault(require("../controllers/UsersController"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var usersRoutes = express_1.Router();
var userAvatarController = new UserAvatarController_1.default();
var usersController = new UsersController_1.default();
var upload = multer_1.default(upload_1.default);
usersRoutes.post('/', usersController.create);
usersRoutes.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), userAvatarController.update);
exports.default = usersRoutes;
