import type {SellerInfo} from '../../entity/seller/SellerInfo.ts';

export default interface SellerRepository {
    getById(id: string): Promise<SellerInfo>;
}
