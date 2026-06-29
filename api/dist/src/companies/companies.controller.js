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
exports.CompaniesController = exports.AdminCompaniesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const companies_service_1 = require("./companies.service");
const create_company_dto_1 = require("./dto/create-company.dto");
const assign_user_dto_1 = require("./dto/assign-user.dto");
const update_company_dto_1 = require("./dto/update-company.dto");
const add_company_user_dto_1 = require("./dto/add-company-user.dto");
const update_company_limit_dto_1 = require("../plans/dto/update-company-limit.dto");
let AdminCompaniesController = class AdminCompaniesController {
    companiesService;
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    list() {
        return this.companiesService.listAll();
    }
    create(dto) {
        return this.companiesService.create(dto);
    }
    getDetail(id) {
        return this.companiesService.getDetailForAdmin(id);
    }
    update(id, dto) {
        return this.companiesService.update(id, dto);
    }
    updateLimits(id, dto) {
        return this.companiesService.updateLimits(id, dto);
    }
    assign(id, dto) {
        return this.companiesService.assignUser(id, dto);
    }
    unassign(userId) {
        return this.companiesService.unassignUser(userId);
    }
};
exports.AdminCompaniesController = AdminCompaniesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminCompaniesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_company_dto_1.CreateCompanyDto]),
    __metadata("design:returntype", void 0)
], AdminCompaniesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCompaniesController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", void 0)
], AdminCompaniesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/limits'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_company_limit_dto_1.UpdateCompanyLimitDto]),
    __metadata("design:returntype", void 0)
], AdminCompaniesController.prototype, "updateLimits", null);
__decorate([
    (0, common_1.Post)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_user_dto_1.AssignUserDto]),
    __metadata("design:returntype", void 0)
], AdminCompaniesController.prototype, "assign", null);
__decorate([
    (0, common_1.Post)('unassign/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminCompaniesController.prototype, "unassign", null);
exports.AdminCompaniesController = AdminCompaniesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Controller)('admin/companies'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], AdminCompaniesController);
let CompaniesController = class CompaniesController {
    companiesService;
    constructor(companiesService) {
        this.companiesService = companiesService;
    }
    getMine(req) {
        return this.companiesService.getMyCompany(req.user.userId);
    }
    updateMine(req, dto) {
        return this.companiesService.updateMine(req.user.userId, dto);
    }
    addUser(req, dto) {
        return this.companiesService.addUserToMyCompany(req.user.userId, dto);
    }
    getPublic(slug) {
        return this.companiesService.getPublicBySlug(slug);
    }
};
exports.CompaniesController = CompaniesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('COMPANY_ADMIN', 'ADMIN'),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "getMine", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('COMPANY_ADMIN', 'ADMIN'),
    (0, common_1.Patch)('me'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_company_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "updateMine", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('COMPANY_ADMIN', 'ADMIN'),
    (0, common_1.Post)('me/users'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_company_user_dto_1.AddCompanyUserDto]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "addUser", null);
__decorate([
    (0, common_1.Get)('public/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompaniesController.prototype, "getPublic", null);
exports.CompaniesController = CompaniesController = __decorate([
    (0, common_1.Controller)('companies'),
    __metadata("design:paramtypes", [companies_service_1.CompaniesService])
], CompaniesController);
//# sourceMappingURL=companies.controller.js.map