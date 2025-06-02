// Review interface used in detailed product info
export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

// Full product info used in detail pages or admin panels
export interface ProductProps {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail: string;
    images: string[];
    tags?: string[];
    weight?: number;
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: Review[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
}

// Simplified product structure, e.g., for list views or FakeStoreAPI
export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    rating?: {
        rate: number;
        count: number;
    };
}

// Pagination props for reusable pagination component
export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    currentSkip: number;
}
