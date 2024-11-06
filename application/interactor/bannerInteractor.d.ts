import { IBannerInteractor } from "../../interface/bannerInterface/ibannerInteractor";
import { ICloudinaryService } from "../../interface/serviceInterface/IcloudinaryInterface";
export declare class BannerInteractor implements IBannerInteractor {
    private cloudinaryService;
    constructor(cloudinaryService: ICloudinaryService);
    addOfferBanner(path: string, startDate: string, endDate: string, name: string, type: string): Promise<any>;
    allBanners(): Promise<any>;
    toggleBannerListedStatus(imageUrl: string, name: string): Promise<any>;
    viewWelcomeBanner(): Promise<any>;
    viewOfferBanner(): Promise<any>;
    viewCollectionBanner(): Promise<any>;
    deleteBanner(imageUrl: string, name: string): Promise<any>;
}
