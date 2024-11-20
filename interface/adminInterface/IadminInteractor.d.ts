import { UserResponse, UserActionResponse } from "../../domain/dtos/AdminDto";
export interface IadminInteractor {
    logIn(data: any): Promise<any>;
    usersData(): Promise<UserResponse>;
    blockUser(data: string): Promise<UserActionResponse>;
    unblockUser(data: string): Promise<UserActionResponse>;
}
