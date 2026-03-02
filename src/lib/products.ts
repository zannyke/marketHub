export interface Product {
    id: string;
    title: string;
    description?: string;
    category: string;
    price: number;
    old_price?: number;
    rating?: number;
    reviews_count?: number;
    image_url: string;
    tag?: string;
    tag_color?: string;
    seller_id: string;
    created_at: string;
}
