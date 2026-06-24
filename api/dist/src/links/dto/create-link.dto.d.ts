export declare enum LinkTypeDto {
    WHATSAPP = "WHATSAPP",
    CALL = "CALL",
    EMAIL = "EMAIL",
    WEBSITE = "WEBSITE",
    PROJECTS = "PROJECTS",
    SCHEDULE_MEETING = "SCHEDULE_MEETING",
    SAVE_CONTACT = "SAVE_CONTACT",
    CUSTOM = "CUSTOM"
}
export declare class CreateLinkDto {
    type: LinkTypeDto;
    title: string;
    url: string;
    icon?: string;
}
