import type BaseViewModel from '../BaseViewModel';
import type {SellerInfo} from '../../../domain/entity/seller/SellerInfo';

export default interface SellerProfileViewModel extends BaseViewModel {
    seller: SellerInfo | null;
    onLoadSeller(sellerId: string): Promise<void>;
}
