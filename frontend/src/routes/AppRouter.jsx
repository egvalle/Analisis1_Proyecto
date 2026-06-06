import { BrowserRouter, Routes, Route } from "react-router-dom"

import HomePage from "../pages/HomePage"
import LoginPage from "../pages/LoginPage"
import RegisterPage from "../pages/RegisterPage"
import DashboardPage from "../pages/DashboardPage"
import CatalogPage from "../pages/CatalogPage"
import ProducerProductsPage from "../pages/ProducerProductsPage"
import HistoryPage from "../pages/HistoryPage"
import RatingsPage from "../pages/RatingsPage"
import ProfilePage from "../pages/ProfilePage"

import ProtectedRoute from "./ProtectedRoute"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route
          path="/"
          element={<HomePage/>}
        />
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/register"
          element={<RegisterPage/>}
        />
        {/* PRIVATE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/catalogo"
          element={
            <ProtectedRoute>
              <CatalogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mis-publicaciones"
          element={
            <ProtectedRoute>
              <ProducerProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/historial"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/valoraciones"
          element={
            <ProtectedRoute>
              <RatingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter