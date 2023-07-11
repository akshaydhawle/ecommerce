export interface Variant {
    id: string;
}
 
 export interface Product {
    id: number;
    description?: string;
    name: string;
    image: string;
    category: string;
    brand: string;
    price: number;
    totalQty: number;
    createdAt?: string;
    variant:Variant[];
 }