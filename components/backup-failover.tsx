"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  HardDrive,
  Clock,
  CheckCircle2,
  Play,
  RefreshCw,
  Database,
  AlertCircle,
  Download,
  Calendar,
  Settings,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const backups = [
  {
    id: 1,
    type: "Full Backup",
    timestamp: "2025-10-17 02:00:00",
    size: "24.3 GB",
    status: "completed",
    duration: "8m 32s",
    retention: "30 days",
    location: "s3://backups/mysql/full/",
  },
  {
    id: 2,
    type: "Incremental",
    timestamp: "2025-10-17 08:00:00",
    size: "1.2 GB",
    status: "completed",
    duration: "1m 15s",
    retention: "7 days",
    location: "s3://backups/mysql/incremental/",
  },
  {
    id: 3,
    type: "Incremental",
    timestamp: "2025-10-17 14:00:00",
    size: "1.8 GB",
    status: "completed",
    duration: "1m 42s",
    retention: "7 days",
    location: "s3://backups/mysql/incremental/",
  },
  {
    id: 4,
    type: "Incremental",
    timestamp: "2025-10-17 20:00:00",
    size: "2.1 GB",
    status: "in-progress",
    duration: "0m 45s",
    retention: "7 days",
    location: "s3://backups/mysql/incremental/",
  },
]

const failoverTests = [
  {
    date: "2025-10-15",
    scenario: "Primary failure simulation",
    rto: "2m 15s",
    rpo: "< 1 min",
    status: "passed",
    notes: "Automatic failover to Replica 1",
  },
  {
    date: "2025-10-10",
    scenario: "Network partition test",
    rto: "2m 42s",
    rpo: "< 1 min",
    status: "passed",
    notes: "DNS re-routing successful",
  },
  {
    date: "2025-10-05",
    scenario: "Data corruption recovery",
    rto: "3m 18s",
    rpo: "5 min",
    status: "passed",
    notes: "Restored from last full backup",
  },
]

const retentionPolicies = [
  { type: "Full Backups", retention: "30 days", frequency: "Daily at 2:00 AM", count: 30 },
  { type: "Incremental Backups", retention: "7 days", frequency: "Every 6 hours", count: 28 },
  { type: "Transaction Logs", retention: "3 days", frequency: "Every 15 minutes", count: 288 },
]

const replicaStatus = [
  { name: "Primary", role: "Master", status: "active", lag: "0s", health: 100 },
  { name: "Replica 1", role: "Standby", status: "syncing", lag: "0.2s", health: 98 },
  { name: "Replica 2", role: "Standby", status: "syncing", lag: "0.5s", health: 95 },
]

export function BackupFailover() {
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<number | null>(null)
  const [restoreTarget, setRestoreTarget] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Backup & Failover Management</h2>
        <p className="text-muted-foreground mt-1">
          Automated backup strategies with point-in-time recovery and disaster recovery orchestration
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recovery Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2m 15s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">-50%</span> RTO improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">45m ago</div>
            <p className="text-xs text-muted-foreground">Incremental backup</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Backup Success</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">100%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failover Tests</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3/3</div>
            <p className="text-xs text-muted-foreground">All tests passed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="backups" className="space-y-4">
        <TabsList>
          <TabsTrigger value="backups">Backups</TabsTrigger>
          <TabsTrigger value="failover">Failover</TabsTrigger>
          <TabsTrigger value="retention">Retention Policies</TabsTrigger>
          <TabsTrigger value="replicas">Replica Status</TabsTrigger>
        </TabsList>

        <TabsContent value="backups" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Backup Schedule</CardTitle>
                  <CardDescription>Automated backups with point-in-time recovery</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  <Button size="sm">
                    <Play className="mr-2 h-4 w-4" />
                    Run Manual Backup
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {backups.map((backup) => (
                  <div
                    key={backup.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                          backup.status === "completed" ? "bg-chart-2/20" : "bg-chart-1/20"
                        }`}
                      >
                        {backup.status === "completed" ? (
                          <CheckCircle2 className="h-5 w-5 text-chart-2" />
                        ) : (
                          <RefreshCw className="h-5 w-5 text-chart-1 animate-spin" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{backup.type}</p>
                        <p className="text-sm text-muted-foreground">{backup.timestamp}</p>
                        <p className="text-xs text-muted-foreground mt-1">{backup.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Size</p>
                        <p className="font-mono font-medium text-foreground">{backup.size}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-mono font-medium text-foreground">{backup.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Retention</p>
                        <p className="font-mono font-medium text-foreground">{backup.retention}</p>
                      </div>
                      <Badge variant={backup.status === "completed" ? "default" : "outline"}>{backup.status}</Badge>
                      {backup.status === "completed" && (
                        <Dialog
                          open={restoreDialogOpen && selectedBackup === backup.id}
                          onOpenChange={(open) => {
                            setRestoreDialogOpen(open)
                            if (!open) setSelectedBackup(null)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" onClick={() => setSelectedBackup(backup.id)}>
                              <Download className="h-4 w-4 mr-2" />
                              Restore
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Restore Database</DialogTitle>
                              <DialogDescription>
                                Restore from backup: {backup.type} - {backup.timestamp}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                  This will restore the database to the state at {backup.timestamp}. Current data will
                                  be backed up before restoration.
                                </AlertDescription>
                              </Alert>
                              <div className="space-y-2">
                                <Label htmlFor="restore-target">Restore Target</Label>
                                <Select value={restoreTarget} onValueChange={setRestoreTarget}>
                                  <SelectTrigger id="restore-target">
                                    <SelectValue placeholder="Select target database" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="primary">Primary Database</SelectItem>
                                    <SelectItem value="replica1">Replica 1 (Testing)</SelectItem>
                                    <SelectItem value="replica2">Replica 2 (Testing)</SelectItem>
                                    <SelectItem value="new">New Database Instance</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Backup Details</Label>
                                <div className="text-sm space-y-1 text-muted-foreground">
                                  <p>Size: {backup.size}</p>
                                  <p>Location: {backup.location}</p>
                                  <p>Estimated restore time: ~{backup.duration}</p>
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setRestoreDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button disabled={!restoreTarget}>
                                <Database className="h-4 w-4 mr-2" />
                                Start Restore
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertDescription>
              Next full backup scheduled for tomorrow at 2:00 AM. Incremental backups run every 6 hours. Point-in-time
              recovery available for the last 72 hours.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="failover" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Failover Test Results</CardTitle>
                  <CardDescription>Disaster recovery readiness validation</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Play className="mr-2 h-4 w-4" />
                  Run Failover Test
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {failoverTests.map((test, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{test.date}</Badge>
                        <p className="font-medium text-foreground">{test.scenario}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{test.notes}</p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">RTO</p>
                        <p className="font-mono text-sm font-medium text-foreground">{test.rto}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">RPO</p>
                        <p className="font-mono text-sm font-medium text-foreground">{test.rpo}</p>
                      </div>
                      <Badge variant="default" className="bg-chart-2">
                        {test.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Automatic Failover</CardTitle>
                <CardDescription>Configured health checks and triggers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Health Check Interval</span>
                  <span className="font-mono font-medium">10 seconds</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Failure Threshold</span>
                  <span className="font-mono font-medium">3 consecutive failures</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Failover Timeout</span>
                  <span className="font-mono font-medium">5 minutes</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Auto-Recovery</span>
                  <Badge variant="default" className="bg-chart-2">
                    Enabled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recovery Objectives</CardTitle>
                <CardDescription>Target metrics for disaster recovery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target RTO</span>
                  <span className="font-mono font-medium">{"< 3 minutes"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target RPO</span>
                  <span className="font-mono font-medium">{"< 1 minute"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Actual RTO (Avg)</span>
                  <span className="font-mono font-medium text-chart-2">2m 38s</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Actual RPO (Avg)</span>
                  <span className="font-mono font-medium text-chart-2">{"< 1 minute"}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Retention Policies</CardTitle>
                  <CardDescription>Automated backup lifecycle management</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Edit Policies
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {retentionPolicies.map((policy, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-foreground">{policy.type}</p>
                        <p className="text-sm text-muted-foreground mt-1">{policy.frequency}</p>
                      </div>
                      <Badge variant="outline">{policy.retention}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Active Backups</span>
                        <span className="font-mono font-medium">{policy.count}</span>
                      </div>
                      <Progress value={(policy.count / (policy.count + 10)) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <HardDrive className="h-4 w-4" />
            <AlertDescription>
              Total backup storage: 156.8 GB across all retention policies. Oldest backups are automatically purged
              based on retention rules.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="replicas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Replica Health Status</CardTitle>
              <CardDescription>Real-time replication monitoring and lag tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {replicaStatus.map((replica, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            replica.status === "active" ? "bg-chart-2/20" : "bg-chart-1/20"
                          }`}
                        >
                          <Database
                            className={`h-5 w-5 ${replica.status === "active" ? "text-chart-2" : "text-chart-1"}`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{replica.name}</p>
                          <p className="text-sm text-muted-foreground">{replica.role}</p>
                        </div>
                      </div>
                      <Badge variant={replica.status === "active" ? "default" : "outline"}>{replica.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Replication Lag</span>
                        <span className="font-mono font-medium">{replica.lag}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Health Score</span>
                          <span className="font-mono font-medium">{replica.health}%</span>
                        </div>
                        <Progress value={replica.health} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
