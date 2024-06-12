import { callExternalApi } from "./external-api.service";

const apiServerUrl = (import.meta.env.VITE_SERVER_URL || "http://localhost:8081") + "/api/v1/products";

export const createProduct = async (accessToken: string, dto: ProductCreationDto) => {
    const config = {
        url: `${apiServerUrl}/create-product`,
        method: "POST",
        data: dto,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}

export const getProducts = async (accessToken: string) => {
    const config = {
        url: `${apiServerUrl}/get-products`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}

export const getProductInfo = async (accessToken: string, productId: string) => {
    const config = {
        url: `${apiServerUrl}/${productId}`,
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}

export const deleteProduct = async (accessToken: string, productId: string) => {
    const config = {
        url: `${apiServerUrl}/delete-product/${productId}`,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "content-type": "application/json",
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}

export const updateProduct = (accessToken: string) => {

}

const itemsInit: IVideoModule[] = [
    {
        id: '1-i',
        name: 'Modulo 1',
        order: 0,
        lessons: [
            {
                id: 'l-11',
                order: 0,
                name: 'Lesson 1.1'
            },
            {
                id: 'l-12',
                name: 'Lesson 1.2',
                order: 1
            },
            {
                id: 'l-13',
                name: 'Lesson 1.3',
                order: 2
            }
        ]
    },
    {
        id: '2-i',
        name: 'Modulo 2',
        order: 1,
        lessons: [
            {
                id: 'l-21',
                name: 'Lesson 2.1',
                order: 0
            },
            {
                id: 'l-22',
                name: 'Lesson 2.2',
                order: 1
            }
        ]
    },
    {
        id: '3-i',
        name: 'Modulo 3',
        order: 2,
        lessons: [
            {
                id: 'l-31',
                name: 'Lesson 3.1',
                order: 0
            },
            {
                id: 'l-32',
                name: 'Lesson 3.2',
                order: 1
            },
            {
                id: 'l-33',
                name: 'Lesson 3.3',
                order: 2
            }
        ]
    }
]

export const getVideoModules = async(accessToken: string, productId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return { data: itemsInit, error: null};
}