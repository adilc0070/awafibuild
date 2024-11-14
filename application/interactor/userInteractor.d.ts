import { IUserInteractor } from "../../interface/userInterface/IuserInteractor";
import { IUserRepo } from "../../interface/userInterface/IuserRepo";
import { IBcrypt } from "../../interface/serviceInterface/IbcryptInterface";
import { UserInteractorResp } from "../../types/userTypes";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
import { IEmailServices } from '../../application/services/emailService';
import { userProfileDTO, userPasswordChangeDTO } from "../../domain/dtos/UserDTO";
import { IaddressRepo } from "../../interface/addressInterface/IaddressRepo";
export declare class UserInteractor implements IUserInteractor {
    private userRepository;
    private bcrypt;
    private jwt;
    private emailService;
    private addressRepo;
    constructor(userRepository: IUserRepo, bcrypt: IBcrypt, jwt: Ijwt, emailService: IEmailServices, addressRepo: IaddressRepo);
    login(email: string, password: string): Promise<UserInteractorResp>;
    registerUser(email: string, name: string, password: string, phone: number): Promise<UserInteractorResp>;
    verifyOtp(email: string, otp: string): Promise<any>;
    editProfile(id: string, email: string, name: string, phone: number): Promise<any>;
    profileData(id: string): Promise<userProfileDTO | null>;
    private mapToUserProfileDTO;
    changeUserPassword(id: string, password: string, newPassword: string): Promise<userPasswordChangeDTO | null | undefined>;
    addUserAddress(id: string, address: any): Promise<any>;
    editUserAddress(id: string, newAddress: any): Promise<any>;
    forgotPassword(email: string): Promise<any>;
    verifyFogotOtp(email: string, userOtp: string): Promise<any>;
    updateNewPassword(email: string, otp: string, newPassword: string): Promise<any>;
    getUserAddress(id: string): Promise<any>;
}
