function DashboardRowItem({ label, value, badge, badgeColor = "yellow" }) {

  const badgeStyles = {
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    brown: "bg-orange-100 text-orange-700",
  }

  return (
    <div className="flex items-center justify-between pb-3 border-b border-border last:border-none last:pb-0">
      <div>
        <p className="text-text font-medium">
          {label}
        </p>
        {value && (
          <p className="text-sm text-textSoft mt-1">
            {value}
          </p>
        )}
      </div>
      {badge && (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold
            ${badgeStyles[badgeColor]}
        `}>
          {badge}
        </span>
      )}
    </div>
  )
}

export default DashboardRowItem