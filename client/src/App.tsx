import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CatalogPage from "./pages/CatalogPage";
import VehicleDetailsPage from "./pages/VehicleDetailsPage";
import BookmarksPage from "./pages/BookmarksPage";
import BookingsPage from "./pages/BookingsPage";
import DashboardPage from "./pages/DashboardPage";
import AdminAddVehiclePage from "./pages/AdminAddVehiclePage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin" element={<AdminAddVehiclePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
