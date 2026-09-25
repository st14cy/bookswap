import type NotificationsViewModel from './NotificationsViewModel';
import type BaseView from '../../view/BaseView';
import type {Notification} from '../../../domain/entity/notification/Notification';
import type NotificationsUseCase from '../../../domain/interactors/notification/NotificationsUseCase';
import type AuthHolder from '../../../domain/entity/auth/models/AuthHolder';
import type AuthListener from '../../../domain/entity/auth/models/AuthListener';

const POLL_INTERVAL_MS = 30000;

export default class NotificationsViewModelImpl implements NotificationsViewModel, AuthListener {
    public unreadCount = 0;
    public items: Notification[] = [];
    public isLoading = false;
    public errorMessage = '';

    private views = new Set<BaseView>();
    private loadedForUserId: string | null = null;
    private pollTimer: ReturnType<typeof setInterval> | null = null;

    private readonly notificationsUseCase: NotificationsUseCase;
    private readonly authHolder: AuthHolder;

    public constructor(notificationsUseCase: NotificationsUseCase, authHolder: AuthHolder) {
        this.notificationsUseCase = notificationsUseCase;
        this.authHolder = authHolder;

        this.authHolder.addAuthListener(this);
        this.onAuthChanged();
    }

    public attachView = (baseView: BaseView): void => { this.views.add(baseView); };
    public detachView = (baseView?: BaseView): void => {
        if (baseView) this.views.delete(baseView);
        else this.views.clear();
    };

    public onAuthChanged = (): void => {
        const userId = this.authHolder.getUser()?.id ?? null;
        if (userId === this.loadedForUserId) return;

        this.loadedForUserId = userId;
        this.stopPolling();
        this.unreadCount = 0;
        this.items = [];
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        if (userId) {
            void this.refreshUnreadCount();
            this.pollTimer = setInterval(() => void this.refreshUnreadCount(), POLL_INTERVAL_MS);
        }
    };

    public loadItems = async (): Promise<void> => {
        if (!this.authHolder.isUserAuthorized() || this.isLoading) return;
        const userId = this.loadedForUserId;
        this.isLoading = true;
        this.errorMessage = '';
        this.notifyViewAboutChanges();

        try {
            const items = await this.notificationsUseCase.getAll();
            if (userId !== this.loadedForUserId) return;
            this.items = items;
            this.unreadCount = items.filter((item) => !item.isRead).length;
        } catch (e) {
            this.errorMessage = e instanceof Error ? e.message : 'Не удалось загрузить уведомления';
        } finally {
            this.isLoading = false;
        }
        this.notifyViewAboutChanges();
    };

    public markAllRead = async (): Promise<void> => {
        if (this.unreadCount === 0) return;
        try {
            await this.notificationsUseCase.markAllRead();
            this.unreadCount = 0;
        } catch {
            return;
        }
        this.notifyViewAboutChanges();
    };

    private refreshUnreadCount = async (): Promise<void> => {
        const userId = this.loadedForUserId;
        try {
            const count = await this.notificationsUseCase.getUnreadCount();
            if (userId !== this.loadedForUserId || count === this.unreadCount) return;
            this.unreadCount = count;
        } catch {
            return;
        }
        this.notifyViewAboutChanges();
    };

    private stopPolling(): void {
        if (this.pollTimer !== null) {
            clearInterval(this.pollTimer);
            this.pollTimer = null;
        }
    }

    private notifyViewAboutChanges = (): void => {
        this.views.forEach((view) => view.onViewModelChanged());
    };
}
