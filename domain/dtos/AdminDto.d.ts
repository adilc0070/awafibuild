export interface UserDTO {
    _id: string;
    email: string;
    name: string;
    phone: number;
    isBlocked: boolean;
}
export interface UserResponse {
    status?: boolean;
    data: UserDTO[];
    message?: string;
}
export interface UserActionResponse {
    success?: boolean;
    message?: string;
}
