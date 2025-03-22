export function EmployeesByCategory() {
  const categories = [
    { name: "CC2", count: 15, color: "bg-blue-500" },
    { name: "CC1", count: 8, color: "bg-green-500" },
    { name: "M4", count: 6, color: "bg-yellow-500" },
    { name: "MS", count: 5, color: "bg-purple-500" },
    { name: "SQ", count: 3, color: "bg-pink-500" },
    { name: "M1", count: 3, color: "bg-indigo-500" },
    { name: "HQ", count: 2, color: "bg-red-500" },
  ]

  const total = categories.reduce((sum, category) => sum + category.count, 0)

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{category.name}</span>
            <span className="text-sm text-muted-foreground">
              {category.count} ({Math.round((category.count / total) * 100)}%)
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className={`h-2 rounded-full ${category.color}`}
              style={{ width: `${(category.count / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

