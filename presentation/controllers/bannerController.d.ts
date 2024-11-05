import { NextFunction, Request, Response } from "express";
import { IBannerInteractor } from "../../interface/bannerInterface/ibannerInteractor";
export declare class BannerController {
    private bannerInteractor;
    constructor(bannerInteractor: IBannerInteractor);
    addOfferBanner(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    allBanners(req: Request, res: Response, next: NextFunction): Promise<void>;
    unlistBanner(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    welcomeBanners(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    offerBanners(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
    collectionBanners(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
