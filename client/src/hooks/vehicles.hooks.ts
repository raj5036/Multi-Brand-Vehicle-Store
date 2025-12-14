import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { api, ApiResponse, PaginatedResponse } from "../lib/api";
import { Vehicle, VehicleFilters, VehicleListItem } from "../types/vehicle";

export function useVehiclesInfinite(filters: VehicleFilters & { limit?: number }) {
	const limit = filters.limit ?? 12;

	return useInfiniteQuery({
		queryKey: ["vehicles-infinite", { ...filters, limit }],
		initialPageParam: 1,
		queryFn: async ({ pageParam }) => {
			const res = await api.get<PaginatedResponse<VehicleListItem[]>>("/vehicles", {
				params: { ...filters, page: pageParam, limit },
			});
			return res.data;
		},
		getNextPageParam: (lastPage) => (lastPage.meta.hasNextPage ? lastPage.meta.page + 1 : undefined),
	});
}

export function useVehicle(id?: string) {
	return useQuery({
		queryKey: ["vehicle", id],
		enabled: !!id,
		queryFn: async () => {
			const res = await api.get<ApiResponse<Vehicle>>(`/vehicles/${id}`);
			return res.data.data;
		},
	});
}

export function useCreateVehicle() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (payload: any) => {
			const res = await api.post<ApiResponse<Vehicle>>(
				"/vehicles",
				payload,
				{ headers: { "x-admin-token": import.meta.env.VITE_ADMIN_TOKEN } }
			);
			return res.data.data;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["vehicles"] });
			qc.invalidateQueries({ queryKey: ["summary"] });
		},
	});
}
