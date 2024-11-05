import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IuserDocument } from "../model/userModel";
import { InewUserData } from "../../types/userTypes";
import { BaseRepository } from "./baseRepository";
import { UserDTO } from "../../domain/dtos/AdminDto";
export declare class UserRepo extends BaseRepository<IuserDocument> implements IUserRepo {
    constructor();
    findUserEmail(email: string): Promise<IuserDocument | null>;
    findUser(id: string): Promise<IuserDocument | null>;
    registerUser(userData: InewUserData): Promise<string>;
    updatePassword(id: string, hashedPassword: string): Promise<void>;
    updateProfile(id: string, email: string, name: string, phone: number): Promise<void>;
    findAll(): Promise<UserDTO[]>;
}
