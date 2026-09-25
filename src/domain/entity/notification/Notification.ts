export interface Notification {
    id: string;
    type: number | string;
    message: string;
    advertisementId: string | null;
    orderId: string | null;
    isRead: boolean;
    createdAt: string;
}
