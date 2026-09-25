import type NotificationRepository from '../../domain/repository/notification/NotificationRepository.ts';
import type {Notification} from '../../domain/entity/notification/Notification.ts';
import type AuthorizedHttpClient from '../http/AuthorizedHttpClient.ts';
import readErrorMessage from '../http/readErrorMessage.ts';

export default class NotificationApiRepository implements NotificationRepository {
    private readonly baseUrl = `${import.meta.env.VITE_API_URL ?? ''}/api/Notification`;
    private readonly httpClient: AuthorizedHttpClient;

    constructor(httpClient: AuthorizedHttpClient) {
        this.httpClient = httpClient;
    }

    async getAll(): Promise<Notification[]> {
        const response = await this.httpClient.fetch(this.baseUrl);
        if (!response.ok) throw new Error(await readErrorMessage(response));
        return (await response.json()) as Notification[];
    }

    async getUnreadCount(): Promise<number> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/unread-count`);
        if (!response.ok) throw new Error(await readErrorMessage(response));
        const data = (await response.json()) as {count: number};
        return data.count;
    }

    async markRead(id: string): Promise<void> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/${id}/read`, {method: 'POST'});
        if (!response.ok) throw new Error(await readErrorMessage(response));
    }

    async markAllRead(): Promise<void> {
        const response = await this.httpClient.fetch(`${this.baseUrl}/read-all`, {method: 'POST'});
        if (!response.ok) throw new Error(await readErrorMessage(response));
    }
}
