"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
class AdminController {
    adminInteractor;
    constructor(adminInteractor) {
        this.adminInteractor = adminInteractor;
    }
    async adminLogin(req, res, next) {
        const result = await this.adminInteractor.logIn(req.body);
        if (result.success) {
            return res
                .status(200)
                .json({ status: true, message: result.message, token: result.data });
        }
        else {
            return res.status(401).json({ status: false, message: result.message });
        }
    }
    async allUsers(req, res, next) {
        try {
            const result = await this.adminInteractor.usersData();
            return res.status(result.status ? 200 : 500).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async blockUser(req, res, next) {
        const result = await this.adminInteractor.blockUser(req.body.email);
        if (result.success) {
            return res
                .status(200)
                .json({ status: true, message: 'User successfully blocked' });
        }
        else {
            return res.status(401).json({ status: false, message: result.message });
        }
    }
    async unblockUser(req, res, next) {
        const result = await this.adminInteractor.unblockUser(req.body.email);
        if (result.success) {
            return res
                .status(200)
                .json({ status: true, message: 'User successfully unblocked' });
        }
        else {
            return res.status(401).json({ status: false, message: result.message });
        }
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map