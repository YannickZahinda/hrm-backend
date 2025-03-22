import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function UpcomingLeaves() {
  const leaves = [
    {
      id: 1,
      employee: { name: "Mohammed Ali", initials: "MA", avatar: "/placeholder.svg?height=32&width=32" },
      type: "regular",
      startDate: "Mar 20, 2025",
      endDate: "Mar 27, 2025",
      isCompleted: false,
    },
    {
      id: 2,
      employee: { name: "Fatima Zahra", initials: "FZ", avatar: "/placeholder.svg?height=32&width=32" },
      type: "sick",
      startDate: "Mar 22, 2025",
      endDate: "Mar 24, 2025",
      isCompleted: false,
    },
    {
      id: 3,
      employee: { name: "Omar Hassan", initials: "OH", avatar: "/placeholder.svg?height=32&width=32" },
      type: "special",
      startDate: "Mar 25, 2025",
      endDate: "Mar 29, 2025",
      isCompleted: false,
    },
  ]

  return (
    <div className="space-y-4">
      {leaves.map((leave) => (
        <div key={leave.id} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={leave.employee.avatar} alt={leave.employee.name} />
              <AvatarFallback>{leave.employee.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{leave.employee.name}</p>
              <p className="text-xs text-muted-foreground">
                {leave.startDate} - {leave.endDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={leave.type === "regular" ? "default" : leave.type === "sick" ? "destructive" : "outline"}>
              {leave.type}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

