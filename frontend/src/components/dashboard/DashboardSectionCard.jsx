function DashboardSectionCard({ title, children, action }) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-soft">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-earth">
          {title}
        </h2>
        {action}
      </div>
      {/* CONTENT */}
      {children}
    </div>
  )
}

export default DashboardSectionCard