import { TrendingUp } from "lucide-react"

function StatsCard({ title, value, icon, growth, color = "leaf" }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300">
      {/* TOP */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-textSoft font-medium">
            {title}
          </p>
          <h3 className="mt-2 text-4xl font-bold text-earth">
            {value}
          </h3>
        </div>
        {/* ICON */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center
            ${color === "leaf" && "bg-leaf/10 text-leaf"}
            ${color === "sun" && "bg-yellow-100 text-sun"}
            ${color === "sky" && "bg-sky/10 text-sky"}
            ${color === "danger" && "bg-red-100 text-danger"}
        `}>
          {icon}
        </div>
      </div>
      {/* BOTTOM */}
      <div className="mt-5 flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm font-medium text-leaf">
          <TrendingUp size={16} />
          <span>
            {growth}
          </span>
        </div>
        <span className="text-sm text-textSoft">este mes</span>
      </div>
    </div>
  )
}
export default StatsCard