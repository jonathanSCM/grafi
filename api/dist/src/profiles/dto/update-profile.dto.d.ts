import { CreateProfileDto } from './create-profile.dto';
declare enum ThemeDto {
    LIGHT = "LIGHT",
    DARK = "DARK"
}
declare enum PhotoStyleDto {
    COLOR = "COLOR",
    BLACK_AND_WHITE = "BLACK_AND_WHITE"
}
declare enum BackgroundTypeDto {
    THEME = "THEME",
    SOLID = "SOLID",
    GRADIENT = "GRADIENT"
}
declare const UpdateProfileDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateProfileDto>>;
export declare class UpdateProfileDto extends UpdateProfileDto_base {
    theme?: ThemeDto;
    photoStyle?: PhotoStyleDto;
    photo?: string;
    logo?: string;
    backgroundType?: BackgroundTypeDto;
    backgroundColor?: string;
    backgroundTo?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    textColor?: string;
}
export {};
