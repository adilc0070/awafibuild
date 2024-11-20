"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutRepository = void 0;
const baseRepository_1 = require("./baseRepository");
class CheckoutRepository extends baseRepository_1.BaseRepository {
    constructor(model) {
        super(model);
    }
    async createCheckout(data) {
        return await super.create(data);
    }
}
exports.CheckoutRepository = CheckoutRepository;
//# sourceMappingURL=checkoutRepository.js.map