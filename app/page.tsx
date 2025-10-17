import { ReplicationDashboard } from "@/components/replication-dashboard"
import { QueryOptimization } from "@/components/query-optimization"
import { BackupFailover } from "@/components/backup-failover"
import { LoadTestingMetrics } from "@/components/load-testing-metrics"
import { SystemArchitecture } from "@/components/system-architecture"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Database } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Database className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">MySQL Operations</h1>
              <p className="text-sm text-muted-foreground">Scalable Deployment & Query Optimization</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="replication" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="replication">Replication</TabsTrigger>
            <TabsTrigger value="queries">Query Optimization</TabsTrigger>
            <TabsTrigger value="backup">Backup & Failover</TabsTrigger>
            <TabsTrigger value="load">Load Testing</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
          </TabsList>

          <TabsContent value="replication" className="space-y-6">
            <ReplicationDashboard />
          </TabsContent>

          <TabsContent value="queries" className="space-y-6">
            <QueryOptimization />
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <BackupFailover />
          </TabsContent>

          <TabsContent value="load" className="space-y-6">
            <LoadTestingMetrics />
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <SystemArchitecture />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
