"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutController = void 0;
class CheckoutController {
    checkoutInteractor;
    constructor(checkoutInteractor) {
        this.checkoutInteractor = checkoutInteractor;
    }
    async checkout(req, res, next) {
        try {
            const userId = req.user?.id;
            if (!userId) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const data = req.body;
            data.userId = userId;
            await this.checkoutInteractor.processCheckout(data);
            res.status(200).json({ message: "Checkout successful!" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CheckoutController = CheckoutController;
//# sourceMappingURL=checkoutController.js.map