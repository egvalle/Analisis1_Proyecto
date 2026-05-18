import { Bell, Search, Menu } from "lucide-react"

function Topbar({ setIsOpen }) {
  return (
    <header className="h-20 bg-white border-b border-border px-4 md:px-8 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* MOBILE MENU */}
        <button onClick={() => setIsOpen(true)} className="lg:hidden w-11 h-11 rounded-xl border border-border flex items-center justify-center">
          <Menu size={22} />
        </button>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* SEARCH */}
        <div className="hidden xl:flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-2 min-w-[260px]">
          <Search size={18} className="text-textSoft"/>
          <input type="text" placeholder="Buscar..." className="bg-transparent outline-none text-sm w-full"/>
        </div>
        {/* NOTIFICATIONS */}
        <button className="relative w-11 h-11 rounded-xl border border-border bg-white flex items-center justify-center">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger"/>
        </button>
        {/* USER */}
        <div className="flex items-center gap-3 bg-background px-3 py-2 rounded-xl border border-border">
          <div className="w-10 h-10 rounded-full bg-leaf text-white flex items-center justify-center font-semibold">EV</div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold">Edwin Valle</p>
            <p className="text-xs text-textSoft">Comprador</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar