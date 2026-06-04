function StatsCard({ title, value, icon, color = "bg-leaf" }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-textSoft">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-earth mt-2">
            {value}
          </h3>
        </div>
        <div className={`${color} w-14 h-14 rounded-2xl flex items-center justify-center text-white`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsCard