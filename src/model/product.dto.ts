interface Product{
    id: string;
    name: string;
    type: ProductType;
    
    priceType?: PriceType;
    price?: number;

    telegramGroups? : any[];
}