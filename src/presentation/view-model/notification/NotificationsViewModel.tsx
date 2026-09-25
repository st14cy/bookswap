import type BaseView from '../../view/BaseView';
import type {Notification} from '../../../domain/entity/notification/Notification';

export default interface NotificationsViewModel {
    attachView(baseView: BaseView): void;
    detachView(baseView?: BaseView): void;

    unreadCount: number;
    items: Notification[];
    isLoading: boolean;
    errorMessage: string;
    loadItems(): Promise<void>;
    markAllRead(): Promise<void>;
}
