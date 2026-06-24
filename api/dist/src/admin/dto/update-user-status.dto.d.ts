export declare enum UserStatusDto {
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    PENDING = "PENDING"
}
export declare class UpdateUserStatusDto {
    status: UserStatusDto;
}
