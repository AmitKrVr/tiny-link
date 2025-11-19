import axios from "axios";

const envBase =
    process.env.NEXT_PUBLIC_BASE_URL ?? process.env.BASE_URL ?? "";
const normalizedBase =
    envBase.length > 0 ? envBase.replace(/\/$/, "") : "";

export const api = axios.create({
    baseURL: normalizedBase ? `${normalizedBase}/api` : "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export type ApiError = {
    message: string;
    status?: number;
    details?: string;
};

export function getApiErrorMessage(error: unknown, fallback = "Unexpected error") {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as ApiError | undefined;
        return data?.message ?? error.message ?? fallback;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return fallback;
}

