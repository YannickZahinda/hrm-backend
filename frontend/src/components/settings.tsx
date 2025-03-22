"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="leave-policies">Leave Policies</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="ACME Corporation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyEmail">Email</Label>
                  <Input id="companyEmail" type="email" defaultValue="hr@acmecorp.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyPhone">Phone</Label>
                  <Input id="companyPhone" defaultValue="+212 5XX-XXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">Address</Label>
                  <Input id="companyAddress" defaultValue="123 Business Ave, Casablanca" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Customize your application behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoBackup">Automatic Backups</Label>
                  <p className="text-sm text-muted-foreground">Create automatic backups of your data</p>
                </div>
                <Switch id="autoBackup" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable dark mode for the application</p>
                </div>
                <Switch id="darkMode" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave-policies" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Leave Policy Configuration</CardTitle>
              <CardDescription>Configure leave policies for different employee categories</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">CC2 Category</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cc2Regular">Regular Leave (days/year)</Label>
                    <Input id="cc2Regular" type="number" defaultValue="22" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc2Sick">Sick Leave (days/year)</Label>
                    <Input id="cc2Sick" type="number" defaultValue="15" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">CC1 & M4 Categories</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cc1Regular">Regular Leave (days/year)</Label>
                    <Input id="cc1Regular" type="number" defaultValue="26" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cc1Sick">Sick Leave (days/year)</Label>
                    <Input id="cc1Sick" type="number" defaultValue="20" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">MS, SQ, M1 & HQ Categories</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="msRegular">Regular Leave (days/year)</Label>
                    <Input id="msRegular" type="number" defaultValue="30" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="msSick">Sick Leave (days/year)</Label>
                    <Input id="msSick" type="number" defaultValue="25" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Policies</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Initialize Leave Policies</CardTitle>
              <CardDescription>Initialize or reset leave policies for all employees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This will initialize leave policies for all employees based on their categories. Use this when setting
                up the system for the first time or when making major policy changes.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Initialize Policies</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup Data</CardTitle>
              <CardDescription>Create a backup of your HRMS data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create a complete backup of all your employee data, leave records, and documents. The backup will be
                downloaded as a compressed file.
              </p>
              <div className="space-y-2">
                <Label htmlFor="backupName">Backup Name</Label>
                <Input id="backupName" defaultValue={`HRMS_Backup_${new Date().toISOString().split("T")[0]}`} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create Backup</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Restore Data</CardTitle>
              <CardDescription>Restore your HRMS data from a backup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Restore your data from a previously created backup file. This will replace all current data with the
                data from the backup.
              </p>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="backupFile">Upload Backup File</Label>
                <Input id="backupFile" type="file" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="destructive">Restore from Backup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

