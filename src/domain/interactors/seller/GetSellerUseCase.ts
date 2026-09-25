import type SellerRepository from '../../repository/seller/SellerRepository.ts';
import type {SellerInfo} from '../../entity/seller/SellerInfo.ts';

export default class GetSellerUseCase {
    private readonly sellerRepository: SellerRepository;

    constructor(sellerRepository: SellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    execute(id: string): Promise<SellerInfo> {
        return this.sellerRepository.getById(id);
    }
}
