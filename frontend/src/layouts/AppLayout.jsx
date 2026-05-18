import { useState } from "react"

import Sidebar from "../components/layout/Sidebar"
import Topbar from "../components/layout/Topbar"

function AppLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <main className="flex-1 lg:ml-0">
          <Topbar
            setIsOpen={setIsOpen}
          />
          <section className="p-4 md:p-8">
            {children}
          </section>
        </main>
      </div>
    </div>
  )
}

export default AppLayout