import { Card } from "@/components/ui/card"
import { Users, Heart, Calendar, Image } from "@/components/icons"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Children Sponsored",
      value: "1,234",
      icon: Users,
      description: "Active sponsorships",
      trend: "+12% from last month",
    },
    {
      title: "Total Donations",
      value: "KES 2.5M",
      icon: Heart,
      description: "This month",
      trend: "+8% from last month",
    },
    {
      title: "Upcoming Events",
      value: "8",
      icon: Calendar,
      description: "Next 30 days",
      trend: "3 this week",
    },
    {
      title: "Gallery Images",
      value: "500+",
      icon: Image,
      description: "Total uploaded",
      trend: "+25 this week",
    },
  ]

  const recentActivities = [
    {
      action: "New sponsorship",
      description: "John Doe sponsored a child",
      time: "2 hours ago",
    },
    {
      action: "Event created",
      description: "Community Outreach added to calendar",
      time: "5 hours ago",
    },
    {
      action: "Story published",
      description: "Success story: Grace's Journey",
      time: "1 day ago",
    },
    {
      action: "Donation received",
      description: "KES 50,000 from ABC Church",
      time: "2 days ago",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the KE 258 Lwanda CDC admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-xs text-muted-foreground">{stat.description}</p>
                <p className="text-xs font-medium text-primary">{stat.trend}</p>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div className="flex-1">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="mb-2 font-semibold">Upload Images</h3>
          <p className="mb-4 text-sm text-muted-foreground">Add new photos to the gallery</p>
          <a href="/admin/images" className="inline-flex items-center text-sm font-medium text-primary hover:underline">
            Go to Image Management →
          </a>
        </Card>
        <Card className="p-6">
          <h3 className="mb-2 font-semibold">Manage Content</h3>
          <p className="mb-4 text-sm text-muted-foreground">Edit stories, events, and programs</p>
          <a
            href="/admin/content"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Go to Content Management →
          </a>
        </Card>
        <Card className="p-6">
          <h3 className="mb-2 font-semibold">Site Settings</h3>
          <p className="mb-4 text-sm text-muted-foreground">Configure website settings</p>
          <a
            href="/admin/settings"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Go to Settings →
          </a>
        </Card>
      </div>
    </div>
  )
}
