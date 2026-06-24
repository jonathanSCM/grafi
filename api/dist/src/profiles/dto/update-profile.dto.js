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
exports.UpdateProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_profile_dto_1 = require("./create-profile.dto");
const class_validator_1 = require("class-validator");
var ThemeDto;
(function (ThemeDto) {
    ThemeDto["LIGHT"] = "LIGHT";
    ThemeDto["DARK"] = "DARK";
})(ThemeDto || (ThemeDto = {}));
var PhotoStyleDto;
(function (PhotoStyleDto) {
    PhotoStyleDto["COLOR"] = "COLOR";
    PhotoStyleDto["BLACK_AND_WHITE"] = "BLACK_AND_WHITE";
})(PhotoStyleDto || (PhotoStyleDto = {}));
var BackgroundTypeDto;
(function (BackgroundTypeDto) {
    BackgroundTypeDto["THEME"] = "THEME";
    BackgroundTypeDto["SOLID"] = "SOLID";
    BackgroundTypeDto["GRADIENT"] = "GRADIENT";
})(BackgroundTypeDto || (BackgroundTypeDto = {}));
class UpdateProfileDto extends (0, mapped_types_1.PartialType)(create_profile_dto_1.CreateProfileDto) {
    theme;
    photoStyle;
    photo;
    logo;
    backgroundType;
    backgroundColor;
    backgroundTo;
    buttonColor;
    buttonTextColor;
    textColor;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ThemeDto),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "theme", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(PhotoStyleDto),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "photoStyle", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "logo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(BackgroundTypeDto),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "backgroundType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "backgroundColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "backgroundTo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "buttonColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "buttonTextColor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsHexColor)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "textColor", void 0);
//# sourceMappingURL=update-profile.dto.js.map