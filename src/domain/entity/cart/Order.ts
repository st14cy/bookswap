export interface OrderItem {
    advertisementId: string;
    bookTitle: string;
    author: string;
}

export interface Order {
    id: string;
    createdAt: string;
    items: OrderItem[];
}
