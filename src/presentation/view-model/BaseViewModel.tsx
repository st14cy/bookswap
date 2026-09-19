import type BaseView from '../view/BaseView';

export default interface BaseViewModel {
    attachView(baseView: BaseView): void;
    detachView(): void;
    isLoading: boolean;
    errorMessage: string;
    isShowError: boolean;
}
