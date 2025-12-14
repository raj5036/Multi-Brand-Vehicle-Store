import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, ApiResponse } from "../lib/api";
import { Bookmark } from "../types/bookmark";

export function useBookmarks() {
	return useQuery({
		queryKey: ["bookmarks"],
		queryFn: async () => {
			const res = await api.get<ApiResponse<Bookmark[]>>("/bookmarks");
			return res.data.data;
		},
	});
}

export function useCreateBookmark() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (vehicleId: string) => {
			const res = await api.post<ApiResponse<Bookmark>>("/bookmarks", { vehicleId });
			return res.data.data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
	});
}

export function useDeleteBookmark() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (bookmarkId: string) => {
			await api.delete(`/bookmarks/${bookmarkId}`);
			return bookmarkId;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
	});
}
