import { LinkType } from '@prisma/client';
export declare class CreateLinkDto {
    type: LinkType;
    title: string;
    url: string;
    icon?: string;
}
