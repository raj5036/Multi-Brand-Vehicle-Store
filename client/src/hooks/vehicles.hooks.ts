import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ApiResponse } from "../lib/api";
import { Vehicle, VehicleFilters, VehicleListItem } from "../types/vehicle";

export function useVehicles(filters: VehicleFilters) {
	return useQuery({
		queryKey: ["vehicles", filters],
		queryFn: async () => {
			const res = await api.get<ApiResponse<VehicleListItem[]>>("/vehicles", { params: filters });
			return res.data.data;
		},
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
