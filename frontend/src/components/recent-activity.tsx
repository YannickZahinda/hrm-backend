import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: { name: "HR Admin", initials: "HR", avatar: "/placeholder.svg?height=32&width=32" },
      action: "added new employee",
      target: "Ahmed Khalid",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "HR Admin", initials: "HR", avatar: "/placeholder.svg?height=32&width=32" },
      action: "registered leave for",
      target: "Fatima Zahra",
      time: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "HR Admin", initials: "HR", avatar: "/placeholder.svg?height=32&width=32" },
      action: "uploaded document for",
      target: "Mohammed Ali",
      time: "Yesterday",
    },
    {
      id: 4,
      user: { name: "HR Admin", initials: "HR", avatar: "/placeholder.svg?height=32&width=32" },
      action: "updated salary for",
      target: "Layla Mansour",
      time: "Yesterday",
    },
    {
      id: 5,
      user: { name: "HR Admin", initials: "HR", avatar: "/placeholder.svg?height=32&width=32" },
      action: "changed category for",
      target: "Omar Hassan",
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

