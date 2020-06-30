"use strict";
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
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
var FakeUserTokensRepository_1 = __importDefault(require("../repositories/fakes/FakeUserTokensRepository"));
var ResetPasswordService_1 = __importDefault(require("./ResetPasswordService"));
var FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
var fakeUsersRepository;
var fakeUserTokensRepository;
var resetPassword;
var fakeHashProvider;
describe('ResetPasswordService', function () {
    // Gatilho do jest antes de cada um dos testes.
    beforeEach(function () {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeUserTokensRepository = new FakeUserTokensRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        resetPassword = new ResetPasswordService_1.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
    });
    it('sould be able to reset the password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, token, generateHash, updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeUsersRepository.create({
                        name: 'Rodrigo Gonçalves',
                        email: 'rodrigo@email.com',
                        password: '123456',
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, fakeUserTokensRepository.generate(user.id)];
                case 2:
                    token = (_a.sent()).token;
                    return [4 /*yield*/, jest.spyOn(fakeHashProvider, 'generateHash')];
                case 3:
                    generateHash = _a.sent();
                    return [4 /*yield*/, resetPassword.execute({
                            password: '123123',
                            token: token,
                        })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, fakeUsersRepository.findById(user.id)];
                case 5:
                    updatedUser = _a.sent();
                    // verificando se a função de envio de email foi chamada.
                    expect(generateHash).toHaveBeenCalledWith('123123');
                    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.password).toBe('123123');
                    return [2 /*return*/];
            }
        });
    }); });
    it('sould be able to reset the password with non-existing token', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(resetPassword.execute({
                        token: 'non-existing-token',
                        password: '123456',
                    })).rejects.toBeInstanceOf(AppError_1.default)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sould be able to reset the password with non-existing user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeUserTokensRepository.generate('non-existing-user')];
                case 1:
                    token = (_a.sent()).token;
                    return [4 /*yield*/, expect(resetPassword.execute({
                            token: token,
                            password: '123456',
                        })).rejects.toBeInstanceOf(AppError_1.default)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sould not be able to reset password if passed more than 2 hours', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeUsersRepository.create({
                        name: 'Rodrigo Gonçalves',
                        email: 'rodrigo@email.com',
                        password: '123456',
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, fakeUserTokensRepository.generate(user.id)];
                case 2:
                    token = (_a.sent()).token;
                    // espionando o momento que a função now do Date foi executada.
                    jest.spyOn(Date, 'now').mockImplementation(function () {
                        // sobrescrevendo a função now do Date com um mock.
                        var customDate = new Date();
                        // acrescentando mais horas.
                        return customDate.setHours(customDate.getHours() + 3);
                    });
                    return [4 /*yield*/, expect(resetPassword.execute({
                            password: '123123',
                            token: token,
                        })).rejects.toBeInstanceOf(AppError_1.default)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
