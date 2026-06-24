declare enum ThemeDto {
    LIGHT = "LIGHT",
    DARK = "DARK"
}
declare enum BackgroundTypeDto {
    THEME = "THEME",
    SOLID = "SOLID",
    GRADIENT = "GRADIENT"
}
export declare class UpdateCompanyDto {
    name?: string;
    description?: string;
    logo?: string;
    website?: string;
    redirectEnabled?: boolean;
    theme?: ThemeDto;
    backgroundType?: BackgroundTypeDto;
    backgroundColor?: string;
    backgroundTo?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    textColor?: string;
}
export {};
