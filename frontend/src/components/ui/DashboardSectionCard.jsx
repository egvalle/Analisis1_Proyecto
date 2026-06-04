function DashboardSectionCard({ title, children, className = "" }) {
  return (
    <div className={`bg-white border border-border rounded-2xl p-6 shadow-soft
      ${className}
    `}>
      {/* TITLE */}
      <div className="mb-5">
        <h3 className="text-xl font-semibold text-earth">
          {title}
        </h3>
      </div>
      {/* CONTENT */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

export default DashboardSectionCard