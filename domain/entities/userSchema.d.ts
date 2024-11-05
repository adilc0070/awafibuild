export declare class User {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly password: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(id: string, name: string, email: string, password: string | null, createdAt: Date, updatedAt: Date);
    static newUser(id: string, name: string, email: string, password: string | null): User;
}
