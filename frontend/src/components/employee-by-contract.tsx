export function EmployeesByContract() {
  const contracts = [
    { type: "CDI", count: 32, color: "bg-blue-500" },
    { type: "CDD", count: 10, color: "bg-green-500" },
  ]

  const total = contracts.reduce((sum, contract) => sum + contract.count, 0)

  return (
    <div className="space-y-6">
      <div className="relative h-40 w-40 mx-auto">
        <svg className="h-full w-full" viewBox="0 0 100 100">
          {/* CDI segment */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="rgb(59 130 246)"
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset="0"
          />
          {/* CDD segment */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="rgb(34 197 94)"
            strokeWidth="20"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 * (contracts[0].count / total)}
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold">{total}</span>
          <span className="text-sm text-muted-foreground">Total</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {contracts.map((contract) => (
          <div key={contract.type} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${contract.color}`} />
            <div>
              <div className="text-sm font-medium">{contract.type}</div>
              <div className="text-xs text-muted-foreground">
                {contract.count} ({Math.round((contract.count / total) * 100)}%)
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

