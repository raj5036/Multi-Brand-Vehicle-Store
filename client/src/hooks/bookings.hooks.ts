import { useMutation, useQuery } from "@tanstack/react-query";
import { api, ApiResponse } from "../lib/api";
import { Booking } from "../types/booking";

export function useBookings(params?: { email?: string }) {
	return useQuery({
		queryKey: ["bookings", params],
		queryFn: async () => {
			const res = await api.get<ApiResponse<Booking[]>>("/bookings", { params });
			return res.data.data;
		},
	});
}

export function useCreateBooking() {
	return useMutation({
		mutationFn: async (payload: {
			vehicleId: string;
			customerName: string;
			customerEmail: string;
			customerPhone?: string;
			note?: string;
		}) => {
			const res = await api.post<ApiResponse<Booking>>("/bookings", payload);
			return res.data.data;
		},
	});
}
