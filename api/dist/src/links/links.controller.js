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
exports.LinksController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const links_service_1 = require("./links.service");
const create_link_dto_1 = require("./dto/create-link.dto");
const update_link_dto_1 = require("./dto/update-link.dto");
const reorder_links_dto_1 = require("./dto/reorder-links.dto");
let LinksController = class LinksController {
    linksService;
    constructor(linksService) {
        this.linksService = linksService;
    }
    list(req) {
        return this.linksService.list(req.user.userId);
    }
    create(req, dto) {
        return this.linksService.create(req.user.userId, dto);
    }
    reorder(req, dto) {
        return this.linksService.reorder(req.user.userId, dto);
    }
    update(req, id, dto) {
        return this.linksService.update(req.user.userId, id, dto);
    }
    remove(req, id) {
        return this.linksService.remove(req.user.userId, id);
    }
};
exports.LinksController = LinksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_link_dto_1.CreateLinkDto]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('reorder'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reorder_links_dto_1.ReorderLinksDto]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "reorder", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_link_dto_1.UpdateLinkDto]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], LinksController.prototype, "remove", null);
exports.LinksController = LinksController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('links'),
    __metadata("design:paramtypes", [links_service_1.LinksService])
], LinksController);
//# sourceMappingURL=links.controller.js.map