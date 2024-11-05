import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";
declare class CloudinaryService implements ICloudinaryService {
    private uploader;
    constructor();
    uploadProductImage(filePath: string): Promise<any>;
    uploadOfferBaner(filePath: string): Promise<any>;
    uploadCategoryImage(filePath: string): Promise<any>;
}
export default CloudinaryService;
