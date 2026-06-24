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
exports.TrackEventDto = exports.EventTypeDto = void 0;
const class_validator_1 = require("class-validator");
var EventTypeDto;
(function (EventTypeDto) {
    EventTypeDto["PROFILE_VIEW"] = "PROFILE_VIEW";
    EventTypeDto["NFC_SCAN"] = "NFC_SCAN";
    EventTypeDto["QR_SCAN"] = "QR_SCAN";
    EventTypeDto["WHATSAPP_CLICK"] = "WHATSAPP_CLICK";
    EventTypeDto["PHONE_CLICK"] = "PHONE_CLICK";
    EventTypeDto["EMAIL_CLICK"] = "EMAIL_CLICK";
    EventTypeDto["SOCIAL_CLICK"] = "SOCIAL_CLICK";
    EventTypeDto["CUSTOM_LINK_CLICK"] = "CUSTOM_LINK_CLICK";
    EventTypeDto["SAVE_CONTACT_CLICK"] = "SAVE_CONTACT_CLICK";
})(EventTypeDto || (exports.EventTypeDto = EventTypeDto = {}));
class TrackEventDto {
    eventType;
    linkId;
    source;
}
exports.TrackEventDto = TrackEventDto;
__decorate([
    (0, class_validator_1.IsEnum)(EventTypeDto),
    __metadata("design:type", String)
], TrackEventDto.prototype, "eventType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrackEventDto.prototype, "linkId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TrackEventDto.prototype, "source", void 0);
//# sourceMappingURL=track-event.dto.js.map