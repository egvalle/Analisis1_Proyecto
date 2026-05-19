import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Topbar from "../components/layout/Topbar"

function AppLayout({ children }) {
  /* MOBILE SIDEBAR */
  const [sidebarOpen, setSidebarOpen] =
    useState(false)
  return (
    <div className="min-h-screen bg-bg flex">
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />
      {/* CONTENT */}
      <div className="flex-1 flex flex-col">
        <Topbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout