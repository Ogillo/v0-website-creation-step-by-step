"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your website settings and preferences</p>
      </div>

      {/* General Settings */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">General Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Organization Name</label>
            <Input defaultValue="KE 258 Lwanda Child Development Centre" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Contact Email</label>
            <Input defaultValue="info@ke258lwanda.org" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Phone Number</label>
            <Input defaultValue="+254 700 000 000" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Physical Address</label>
            <Input defaultValue="Lwanda, Homa Bay County, Kenya" />
          </div>
        </div>
      </Card>

      {/* Social Media */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Social Media Links</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Facebook</label>
            <Input placeholder="https://facebook.com/..." />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Twitter</label>
            <Input placeholder="https://twitter.com/..." />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Instagram</label>
            <Input placeholder="https://instagram.com/..." />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">YouTube</label>
            <Input placeholder="https://youtube.com/..." />
          </div>
        </div>
      </Card>

      {/* Partnership Information */}
      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Partnership Information</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">Compassion International Project Number</label>
            <Input defaultValue="KE-258" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">FGCK Church Name</label>
            <Input defaultValue="Full Gospel Churches of Kenya - Lwanda" />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg">Save Changes</Button>
      </div>
    </div>
  )
}
