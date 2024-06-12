import { callExternalApi } from "./external-api.service";

const apiServerUrl = (import.meta.env.VITE_SERVER_URL || "http://localhost:8081") + "/api/v1/telegram";

export const generateCode = async (accessToken: string) => {
    const config = {
        url: `${apiServerUrl}/generate-code`,
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