"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Edit, Trash2 } from "@/components/icons"

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState<"stories" | "events" | "programs">("stories")

  const stories = [
    { id: 1, title: "Grace's Journey to Success", status: "Published", date: "2024-01-15" },
    { id: 2, title: "Community Impact Story", status: "Draft", date: "2024-01-20" },
    { id: 3, title: "Youth Development Success", status: "Published", date: "2024-01-25" },
  ]

  const events = [
    { id: 1, title: "Community Outreach Day", status: "Upcoming", date: "2024-02-15" },
    { id: 2, title: "Annual Fundraising Gala", status: "Upcoming", date: "2024-03-10" },
    { id: 3, title: "Youth Leadership Workshop", status: "Past", date: "2024-01-05" },
  ]

  const programs = [
    { id: 1, title: "Child Survival Intervention", status: "Active", participants: 150 },
    { id: 2, title: "Child Development Sponsorship", status: "Active", participants: 1234 },
    { id: 3, title: "Youth Development", status: "Active", participants: 89 },
  ]

  const tabs = [
    { id: "stories", label: "Stories" },
    { id: "events", label: "Events" },
    { id: "programs", label: "Programs" },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
          <p className="text-muted-foreground">Manage stories, events, and programs</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder={`Search ${activeTab}...`} className="pl-10" />
      </div>

      {/* Content Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  {activeTab === "programs" ? "Participants" : "Date"}
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {activeTab === "stories" &&
                stories.map((story) => (
                  <tr key={story.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{story.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          story.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {story.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{story.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              {activeTab === "events" &&
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{event.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          event.status === "Upcoming" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{event.date}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              {activeTab === "programs" &&
                programs.map((program) => (
                  <tr key={program.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 text-sm font-medium">{program.title}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        {program.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{program.participants} participants</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
