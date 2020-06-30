"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var UpdatedProfileService = /** @class */ (function () {
    function UpdatedProfileService(usersRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }
    UpdatedProfileService.prototype.execute = function (_a) {
        var name = _a.name, email = _a.email, old_password = _a.old_password, password = _a.password, user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var user, userWithUpdatedEmail, checkOldPassword, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.usersRepository.findById(user_id)];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new AppError_1.default('User not found');
                        }
                        return [4 /*yield*/, this.usersRepository.findByEmail(email)];
                    case 2:
                        userWithUpdatedEmail = _c.sent();
                        // Verificando se o e-mail está sendo utilizado por outro usuário.
                        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
                            throw new AppError_1.default('E-mail already in use.');
                        }
                        user.name = name;
                        user.email = email;
                        if (password && !old_password) {
                            throw new AppError_1.default('You need to inform  the old password to set a new password.');
                        }
                        if (!(password && old_password)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.hashProvider.compareHash(old_password, user.password)];
                    case 3:
                        checkOldPassword = _c.sent();
                        if (!checkOldPassword) {
                            throw new AppError_1.default('Old password does not match.');
                        }
                        _b = user;
                        return [4 /*yield*/, this.hashProvider.generateHash(password)];
                    case 4:
                        _b.password = _c.sent();
                        _c.label = 5;
                    case 5: return [2 /*return*/, this.usersRepository.save(user)];
                }
            });
        });
    };
    UpdatedProfileService = __decorate([
        tsyringe_1.injectable(),
        __param(0, tsyringe_1.inject('UsersRepository')),
        __param(1, tsyringe_1.inject('HashProvider')),
        __metadata("design:paramtypes", [Object, Object])
    ], UpdatedProfileService);
    return UpdatedProfileService;
}());
exports.default = UpdatedProfileService;
