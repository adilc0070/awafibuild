import { IadminInteractor } from "../../interface/adminInterface/IadminInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import { UserResponse, UserActionResponse } from "../../domain/dtos/AdminDto";
export declare class AdminInteractor implements IadminInteractor {
    private userRepository;
    private jwt;
    constructor(userRepository: IUserRepo, jwt: Ijwt);
    logIn(data: any): Promise<any>;
    usersData(): Promise<UserResponse>;
    blockUser(email: string): Promise<UserActionResponse>;
    unblockUser(email: string): Promise<UserActionResponse>;
}
