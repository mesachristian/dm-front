import { callExternalApi } from "./external-api.service";

const apiServerUrl = (import.meta.env.VITE_SERVER_URL || "http://localhost:8081") + "/api/v1/auth";

export const signIn = async (email: string, password: string) => {
    const config = {
        url: `${apiServerUrl}/authenticate`,
        method: "POST",
        data: { email, password },
        headers: {
            "content-type": "application/json",
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}

export const createAccount = async (name: string, email: string, password: string) => {
    const config = {
        url: `${apiServerUrl}/register`,
        method: "POST",
        data: { name, email, password },
        headers: {
            "content-type": "application/json",
        }
    };

    const { data, error } = await callExternalApi({ config });

    return {
        data: data || null,
        error,
    };
}