export interface userDTO {
    id: string;
    name: string;
    email: string;
    phone: number;
}
export interface userCreationDTO {
    name: string;
    password: string;
    email: string;
    phone: number;
    isVerified: boolean;
}
export interface userProfileDTO {
    name: string;
    email: string;
    phone: number;
}
export interface userPasswordChangeDTO {
    status: boolean;
    message: string;
}
