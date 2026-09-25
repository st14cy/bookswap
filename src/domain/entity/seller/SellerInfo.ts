export interface SellerInfo {
    id: string;
    name: string;
    rating: number;
    image?: string | null;
    registeredAt: string;
    advertisementsCount: number;
}
