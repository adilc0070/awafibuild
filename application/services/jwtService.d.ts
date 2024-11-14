import { JwtPayload } from "jsonwebtoken";
import { Ijwt } from "../../interface/serviceInterface/IjwtInterface";
export type jwtOutput = {
    payload: JwtPayload | null;
    message: string;
};
export declare class JWT implements Ijwt {
    constructor();
    generateToken(payload: object, expiresIn: string | number): string;
    verifyToken(token: string): any;
    verifyRefreshToken(token: string): JwtPayload | null;
}
