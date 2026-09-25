import type {Notification} from '../../entity/notification/Notification.ts';

export default interface NotificationRepository {
    getAll(): Promise<Notification[]>;
    getUnreadCount(): Promise<number>;
    markRead(id: string): Promise<void>;
    markAllRead(): Promise<void>;
}
