import type SellerProfileViewModel from './SellerProfileViewModel';
import type BaseView from '../../view/BaseView';
import type {SellerInfo} from '../../../domain/entity/seller/SellerInfo';
import type GetSellerUseCase from '../../../domain/interactors/seller/GetSellerUseCase';

export default class SellerProfileViewModelImpl implements SellerProfileViewModel {
    public seller: SellerInfo | null = null;
    public isLoading = false;
    public isShowError = false;
    public errorMessage = '';

    private baseView?: BaseView;
    private readonly getSellerUseCase: GetSellerUseCase;

    public constructor(getSellerUseCase: GetSellerUseCase) {
        this.getSellerUseCase = getSellerUseCase;
    }

    public attachView = (baseView: BaseView): void => { this.baseView = baseView; };
    public detachView = (): void => { this.baseView = undefined; };

    public onLoadSeller = async (sellerId: string): Promise<void> => {
        this.isLoading = true;
        this.isShowError = false;
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        try {
            this.seller = await this.getSellerUseCase.execute(sellerId);
        } catch (e) {
            this.seller = null;
            this.errorMessage = e instanceof Error ? e.message : 'Не удалось загрузить продавца';
            this.isShowError = true;
        } finally {
            this.isLoading = false;
        }
        this.notifyViewAboutChanges();
    };

    private notifyViewAboutChanges = (): void => {
        this.baseView?.onViewModelChanged();
    };
}
