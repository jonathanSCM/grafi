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
exports.UpdateCompanyDto = void 0;
const class_validator_1 = require("class-validator");
var ThemeDto;
(function (ThemeDto) {
    ThemeDto["LIGHT"] = "LIGHT";
    ThemeDto["DARK"] = "DARK";
})(ThemeDto || (ThemeDto = {}));
var BackgroundTypeDto;
(function (BackgroundTypeDto) {
    BackgroundTypeDto["THEME"] = "THEME";
    BackgroundTypeDto["SOLID"] = "SOLID";
    BackgroundTypeDto["GRADIENT"] = "GRADIENT";
})(BackgroundTypeDto || (BackgroundTypeDto = {}));
class UpdateCompanyDto {
    name;
    description;
    logo;
    website;
    redirectEnabled;
    theme;
    backgroundType;
    backgroundColor;
    backgroundTo;
    buttonColor;
    buttonTextColor;
    textColor;
}
exports.UpdateCompanyDto = UpdateCompanyDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "logo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)({ require_protocol: true }),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "website", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCompanyDto.prototype, "redirectEnabled", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ThemeDto),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "theme", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BackgroundTypeDto),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "backgroundType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "backgroundColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "backgroundTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "buttonColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "buttonTextColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateCompanyDto.prototype, "textColor", void 0);
//# sourceMappingURL=update-company.dto.js.map