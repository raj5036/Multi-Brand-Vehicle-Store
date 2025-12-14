import { useQuery } from "@tanstack/react-query";
import { api, ApiResponse } from "../lib/api";
import { Summary } from "../types/summary";

export function useSummary() {
	return useQuery({
		queryKey: ["summary"],
		queryFn: async () => {
			const res = await api.get<ApiResponse<Summary>>("/vehicles/summary");
			return res.data.data;
		},
	});
};
