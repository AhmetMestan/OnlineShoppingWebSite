export interface IProduct {
    meta: Meta;
    data: Product[];
}

export interface Meta {
    total_pages: number; // Toplam sayfa sayısı
    currentPage: number; // Mevcut sayfa
    perPage: number; // Sayfa başına ürün sayısı
  }

export interface Product {
    seller: string;
    reviews: string;
    discountPrice: any;
    id:                   number;
    title:                string;
    description:          string;
    category:             string;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand:                string;
    sku:                  string;
    minimumOrderQuantity: number;
    images:               string[];
}


export interface Meta {
    status:     number;
    message:    string;
    pagination: Pagination;
}

export interface Pagination {
    page:        number;
    per_page:    number;
    total_items: number;
    total_pages: number;
}

export interface IProductDetail {
    meta: Meta;
    data: Product;
}
