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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var UserToken = /** @class */ (function () {
    function UserToken() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], UserToken.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        typeorm_1.Generated('uuid'),
        __metadata("design:type", String)
    ], UserToken.prototype, "token", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], UserToken.prototype, "user_id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], UserToken.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], UserToken.prototype, "updated_at", void 0);
    UserToken = __decorate([
        typeorm_1.Entity('user_tokens')
    ], UserToken);
    return UserToken;
}());
exports.default = UserToken;
