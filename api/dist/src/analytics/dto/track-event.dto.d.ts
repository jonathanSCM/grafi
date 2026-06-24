export declare enum EventTypeDto {
    PROFILE_VIEW = "PROFILE_VIEW",
    NFC_SCAN = "NFC_SCAN",
    QR_SCAN = "QR_SCAN",
    WHATSAPP_CLICK = "WHATSAPP_CLICK",
    PHONE_CLICK = "PHONE_CLICK",
    EMAIL_CLICK = "EMAIL_CLICK",
    SOCIAL_CLICK = "SOCIAL_CLICK",
    CUSTOM_LINK_CLICK = "CUSTOM_LINK_CLICK",
    SAVE_CONTACT_CLICK = "SAVE_CONTACT_CLICK"
}
export declare class TrackEventDto {
    eventType: EventTypeDto;
    linkId?: string;
    source?: string;
}
