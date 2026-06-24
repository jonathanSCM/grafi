import { CreateSocialLinkDto } from './create-social-link.dto';
declare const UpdateSocialLinkDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSocialLinkDto>>;
export declare class UpdateSocialLinkDto extends UpdateSocialLinkDto_base {
    order?: number;
    isActive?: boolean;
}
export {};
