import express from "express";
export declare const validateUserInput: (req: express.Request, res: express.Response, next: express.NextFunction) => express.Response<any, Record<string, any>> | undefined;
