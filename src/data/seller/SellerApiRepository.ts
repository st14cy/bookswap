import type SellerRepository from '../../domain/repository/seller/SellerRepository.ts';
import type {SellerInfo} from '../../domain/entity/seller/SellerInfo.ts';
import readErrorMessage from '../http/readErrorMessage.ts';

export default class SellerApiRepository implements SellerRepository {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/Seller`;

    async getById(id: string): Promise<SellerInfo> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error(await readErrorMessage(response));
        return (await response.json()) as SellerInfo;
    }
}
