import CryptoJs from "crypto-js";

export const getProductBillInfo = async (accessToken: string, productId: string) => {
    const x: ProductBillDto = {
        name: 'Canal de TG',
        description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        coverImg: '',
        productType: 'TELEGRAM'
    }

    return { data: x, error: null };
}

export const generateSignature = (
    apiKey: string, 
    merchantId: string, 
    referenceCode: string, 
    amount: string, 
    currency: string) =>{

    const string2Encrypt = `${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`;
    
    const hash = CryptoJs.MD5(string2Encrypt);

    return hash;
}

