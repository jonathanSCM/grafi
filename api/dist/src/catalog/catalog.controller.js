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
exports.PublicCompanyCatalogController = exports.PublicCatalogController = exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const catalog_service_1 = require("./catalog.service");
const create_catalog_item_dto_1 = require("./dto/create-catalog-item.dto");
const update_catalog_item_dto_1 = require("./dto/update-catalog-item.dto");
let CatalogController = class CatalogController {
    catalogService;
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    list(req) {
        return this.catalogService.list(req.user.userId);
    }
    create(req, dto) {
        return this.catalogService.create(req.user.userId, dto);
    }
    update(req, id, dto) {
        return this.catalogService.update(req.user.userId, id, dto);
    }
    remove(req, id) {
        return this.catalogService.remove(req.user.userId, id);
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_catalog_item_dto_1.CreateCatalogItemDto]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_catalog_item_dto_1.UpdateCatalogItemDto]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "remove", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('COMPANY_ADMIN', 'ADMIN'),
    (0, common_1.Controller)('companies/me/catalog'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
let PublicCatalogController = class PublicCatalogController {
    catalogService;
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    listPublic(slug) {
        return this.catalogService.listForProfile(slug);
    }
};
exports.PublicCatalogController = PublicCatalogController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicCatalogController.prototype, "listPublic", null);
exports.PublicCatalogController = PublicCatalogController = __decorate([
    (0, common_1.Controller)('profiles/:slug/catalog'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], PublicCatalogController);
let PublicCompanyCatalogController = class PublicCompanyCatalogController {
    catalogService;
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    listPublic(slug) {
        return this.catalogService.listForCompanySlug(slug);
    }
};
exports.PublicCompanyCatalogController = PublicCompanyCatalogController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PublicCompanyCatalogController.prototype, "listPublic", null);
exports.PublicCompanyCatalogController = PublicCompanyCatalogController = __decorate([
    (0, common_1.Controller)('companies/public/:slug/catalog'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], PublicCompanyCatalogController);
//# sourceMappingURL=catalog.controller.js.map