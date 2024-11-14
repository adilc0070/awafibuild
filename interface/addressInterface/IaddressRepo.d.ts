export interface IaddressRepo {
    addAddress(id: string, address: any): Promise<any>;
    editAddress(id: string, newAddress: string): Promise<any>;
    getAddress(userId: string): Promise<any>;
}
