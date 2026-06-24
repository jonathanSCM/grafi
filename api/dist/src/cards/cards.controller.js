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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const cards_service_1 = require("./cards.service");
const register_card_dto_1 = require("./dto/register-card.dto");
const mark_programmed_dto_1 = require("./dto/mark-programmed.dto");
let CardsController = class CardsController {
    cardsService;
    constructor(cardsService) {
        this.cardsService = cardsService;
    }
    getMine(req) {
        return this.cardsService.getMine(req.user.userId);
    }
    registerMine(req, dto) {
        return this.cardsService.registerMine(req.user.userId, dto);
    }
    markProgrammed(req, dto) {
        return this.cardsService.markProgrammed(req.user.userId, dto);
    }
};
exports.CardsController = CardsController;
__decorate([
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "getMine", null);
__decorate([
    (0, common_1.Post)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, register_card_dto_1.RegisterCardDto]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "registerMine", null);
__decorate([
    (0, common_1.Patch)('me/programmed'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mark_programmed_dto_1.MarkProgrammedDto]),
    __metadata("design:returntype", void 0)
], CardsController.prototype, "markProgrammed", null);
exports.CardsController = CardsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('cards'),
    __metadata("design:paramtypes", [cards_service_1.CardsService])
], CardsController);
//# sourceMappingURL=cards.controller.js.map