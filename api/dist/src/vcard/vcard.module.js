"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VcardModule = void 0;
const common_1 = require("@nestjs/common");
const vcard_service_1 = require("./vcard.service");
const vcard_controller_1 = require("./vcard.controller");
let VcardModule = class VcardModule {
};
exports.VcardModule = VcardModule;
exports.VcardModule = VcardModule = __decorate([
    (0, common_1.Module)({
        controllers: [vcard_controller_1.VcardController],
        providers: [vcard_service_1.VcardService],
    })
], VcardModule);
//# sourceMappingURL=vcard.module.js.map