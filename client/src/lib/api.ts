import axios from "axios";

export const api = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
	headers: { "Content-Type": "application/json" },
});

export type ApiResponse<T> = { data: T };

export type PaginatedResponse<T> = {
	data: T;
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
		hasNextPage: boolean;
		hasPrevPage: boolean;
	};
};