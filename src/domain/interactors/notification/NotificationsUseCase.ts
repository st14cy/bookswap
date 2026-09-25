import type NotificationRepository from '../../repository/notification/NotificationRepository.ts';
import type {Notification} from '../../entity/notification/Notification.ts';

export default class NotificationsUseCase {
    private readonly notificationRepository: NotificationRepository;

    constructor(notificationRepository: NotificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    getAll(): Promise<Notification[]> {
        return this.notificationRepository.getAll();
    }

    getUnreadCount(): Promise<number> {
        return this.notificationRepository.getUnreadCount();
    }

    markRead(id: string): Promise<void> {
        return this.notificationRepository.markRead(id);
    }

    markAllRead(): Promise<void> {
        return this.notificationRepository.markAllRead();
    }
}
