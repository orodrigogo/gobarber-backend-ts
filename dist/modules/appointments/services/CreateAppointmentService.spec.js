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
var FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
var CreateAppointmentService_1 = __importDefault(require("./CreateAppointmentService"));
var fakeAppointmentsRepository;
var createAppointment;
// describe - função do jest para criar categorias de jest para ficar mais organizado.
describe('CreateAppointment', function () {
    beforeEach(function () {
        fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        createAppointment = new CreateAppointmentService_1.default(fakeAppointmentsRepository);
    });
    // it - função do jest para descrever o teste.
    it('sould be able to create a new appointment', function () { return __awaiter(void 0, void 0, void 0, function () {
        var appointment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createAppointment.execute({
                        date: new Date(),
                        provider_id: '1232154',
                    })];
                case 1:
                    appointment = _a.sent();
                    // validação do teste.
                    expect(appointment).toHaveProperty('id');
                    expect(appointment.provider_id).toBe('1232154');
                    return [2 /*return*/];
            }
        });
    }); });
    it('sould not be able to create two appointments on the same time', function () { return __awaiter(void 0, void 0, void 0, function () {
        var appointmentDate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appointmentDate = new Date(2020, 7, 3, 14);
                    return [4 /*yield*/, createAppointment.execute({
                            date: appointmentDate,
                            provider_id: '1232154',
                        })];
                case 1:
                    _a.sent();
                    expect(createAppointment.execute({
                        date: appointmentDate,
                        provider_id: '1232154',
                    })).rejects.toBeInstanceOf(AppError_1.default);
                    return [2 /*return*/];
            }
        });
    }); });
});
