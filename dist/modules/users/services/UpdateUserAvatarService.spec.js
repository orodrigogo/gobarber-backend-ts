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
var FakeStorageProvider_1 = __importDefault(require("@shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));
var FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
var UpdateUserAvatarService_1 = __importDefault(require("./UpdateUserAvatarService"));
var fakeUsersRepository;
var fakeStorageProvider;
var updateUserAvatar;
describe('UpdateUserAvatar', function () {
    beforeEach(function () {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeStorageProvider = new FakeStorageProvider_1.default();
        updateUserAvatar = new UpdateUserAvatarService_1.default(fakeUsersRepository, fakeStorageProvider);
    });
    it('sould be able to create a new user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fakeUsersRepository.create({
                        name: 'Rodrigo Gonçalves',
                        email: 'rodrigo@email.com',
                        password: '123456',
                    })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, updateUserAvatar.execute({
                            user_id: user.id,
                            avatarFilename: 'avatar.jpg',
                        })];
                case 2:
                    _a.sent();
                    expect(user.avatar).toBe('avatar.jpg');
                    return [2 /*return*/];
            }
        });
    }); });
    it('sould be able to update avatar from non existing user', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(updateUserAvatar.execute({
                        user_id: 'non-existing-user',
                        avatarFilename: 'avatar.jpg',
                    })).rejects.toBeInstanceOf(AppError_1.default)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('sould delete old avatar when updating new one', function () { return __awaiter(void 0, void 0, void 0, function () {
        var deleteFile, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
                    return [4 /*yield*/, fakeUsersRepository.create({
                            name: 'Rodrigo Gonçalves',
                            email: 'rodrigo@email.com',
                            password: '123456',
                        })];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, updateUserAvatar.execute({
                            user_id: user.id,
                            avatarFilename: 'avatar.jpg',
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, updateUserAvatar.execute({
                            user_id: user.id,
                            avatarFilename: 'avatar2.jpg',
                        })];
                case 3:
                    _a.sent();
                    // verificando se a função foi executada com o parametro de deletar a imagem antiga.
                    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
                    return [2 /*return*/];
            }
        });
    }); });
});
