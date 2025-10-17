"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Server, HardDrive, Zap, Shield, RefreshCw, Network, Cloud, Lock, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const architectureComponents = [
  {
    name: "Application Layer",
    icon: Server,
    description: "Next.js application with query routing logic",
    features: ["Write queries → Primary", "Read queries → Replicas", "Connection pooling", "Query caching"],
    specs: {
      framework: "Next.js 15.5",
      runtime: "Node.js 20",
      connections: "1,000 pool size",
      cache: "Redis 7.2",
    },
  },
  {
    name: "MySQL Primary",
    icon: Database,
    description: "Primary database handling all write operations",
    features: ["Write operations", "Binary log enabled", "Semi-sync replication", "Auto-failover ready"],
    specs: {
      version: "MySQL 8.0.35",
      storage: "InnoDB",
      memory: "32 GB buffer pool",
      cpu: "8 vCPUs",
    },
  },
  {
    name: "MySQL Replicas",
    icon: RefreshCw,
    description: "Read replicas for distributed query load",
    features: ["Read operations", "Async replication", "Geographic distribution", "Load balancing"],
    specs: {
      count: "3 replicas",
      regions: "US-East, US-West, EU",
      lag: "< 1 second",
      loadBalancer: "ProxySQL",
    },
  },
  {
    name: "Backup System",
    icon: HardDrive,
    description: "Automated backup and recovery infrastructure",
    features: ["Full backups (daily)", "Incremental backups (6h)", "Point-in-time recovery", "Automated testing"],
    specs: {
      storage: "S3 Standard-IA",
      retention: "30 days full, 7 days incremental",
      encryption: "AES-256",
      rto: "< 3 minutes",
    },
  },
]

const optimizationStrategies = [
  {
    strategy: "Covering Indexes",
    impact: "High",
    description: "Indexes that include all columns needed for a query, eliminating table lookups",
    implementation: "12 covering indexes added across high-traffic tables",
  },
  {
    strategy: "Query Rewrites",
    impact: "High",
    description: "Restructuring queries to use more efficient execution plans",
    implementation: "Subquery optimization and join order improvements",
  },
  {
    strategy: "Connection Pooling",
    impact: "Medium",
    description: "Reusing database connections to reduce overhead",
    implementation: "1,000 connection pool with automatic scaling",
  },
  {
    strategy: "Query Caching",
    impact: "Medium",
    description: "Caching frequently accessed query results",
    implementation: "Redis cache with 15-minute TTL for read queries",
  },
]

const technologyStack = [
  {
    category: "Database",
    technologies: [
      { name: "MySQL", version: "8.0.35", purpose: "Primary data store" },
      { name: "ProxySQL", version: "2.5.5", purpose: "Query routing & load balancing" },
    ],
  },
  {
    category: "Application",
    technologies: [
      { name: "Next.js", version: "15.5.4", purpose: "Web framework" },
      { name: "Node.js", version: "20.x", purpose: "Runtime environment" },
      { name: "TypeScript", version: "5.x", purpose: "Type safety" },
    ],
  },
  {
    category: "Caching & Queue",
    technologies: [
      { name: "Redis", version: "7.2", purpose: "Query result caching" },
      { name: "Bull", version: "4.x", purpose: "Background job processing" },
    ],
  },
  {
    category: "Infrastructure",
    technologies: [
      { name: "AWS EC2", version: "t3.xlarge", purpose: "Database hosting" },
      { name: "AWS S3", version: "Standard-IA", purpose: "Backup storage" },
      { name: "CloudWatch", version: "-", purpose: "Monitoring & alerting" },
    ],
  },
  {
    category: "Security",
    technologies: [
      { name: "SSL/TLS", version: "1.3", purpose: "Encrypted connections" },
      { name: "AWS KMS", version: "-", purpose: "Key management" },
      { name: "IAM", version: "-", purpose: "Access control" },
    ],
  },
]

const deploymentTopology = [
  {
    region: "US-East-1",
    components: ["Primary MySQL", "Replica 1", "Application Servers (3)", "Redis Cache"],
    latency: "< 5ms",
    role: "Primary Region",
  },
  {
    region: "US-West-2",
    components: ["Replica 2", "Application Servers (2)", "Redis Cache"],
    latency: "< 10ms",
    role: "Secondary Region",
  },
  {
    region: "EU-West-1",
    components: ["Replica 3", "Application Servers (2)", "Redis Cache"],
    latency: "< 15ms",
    role: "European Region",
  },
]

export function SystemArchitecture() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">System Architecture</h2>
        <p className="text-muted-foreground mt-1">
          Comprehensive overview of the scalable MySQL deployment infrastructure
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="dataflow">Data Flow</TabsTrigger>
          <TabsTrigger value="stack">Tech Stack</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Architecture Diagram</CardTitle>
              <CardDescription>High-level system architecture with replication and failover</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 p-6 bg-muted/30 rounded-lg">
                {/* Application Layer */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 px-6 py-4 bg-card border-2 border-primary rounded-lg">
                    <Server className="h-8 w-8 text-primary" />
                    <p className="font-semibold text-foreground">Application Layer</p>
                    <p className="text-xs text-muted-foreground">Next.js + ProxySQL</p>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                </div>

                {/* Database Layer */}
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="flex flex-col items-center gap-2 px-4 py-3 bg-card border-2 border-chart-2 rounded-lg">
                    <Database className="h-6 w-6 text-chart-2" />
                    <p className="font-semibold text-sm text-foreground">Primary</p>
                    <Badge variant="default" className="text-xs">
                      Write
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg">
                    <RefreshCw className="h-6 w-6 text-chart-1" />
                    <p className="font-semibold text-sm text-foreground">Replica 1</p>
                    <Badge variant="outline" className="text-xs">
                      Read
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg">
                    <RefreshCw className="h-6 w-6 text-chart-1" />
                    <p className="font-semibold text-sm text-foreground">Replica 2</p>
                    <Badge variant="outline" className="text-xs">
                      Read
                    </Badge>
                  </div>
                  <div className="flex flex-col items-center gap-2 px-4 py-3 bg-card border border-border rounded-lg">
                    <RefreshCw className="h-6 w-6 text-chart-1" />
                    <p className="font-semibold text-sm text-foreground">Replica 3</p>
                    <Badge variant="outline" className="text-xs">
                      Read
                    </Badge>
                  </div>
                </div>

                {/* Arrow Down */}
                <div className="flex justify-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground rotate-90" />
                </div>

                {/* Backup Layer */}
                <div className="flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 px-6 py-4 bg-card border border-border rounded-lg">
                    <HardDrive className="h-8 w-8 text-chart-3" />
                    <p className="font-semibold text-foreground">Backup System</p>
                    <p className="text-xs text-muted-foreground">S3 + Automated Recovery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Summary</CardTitle>
              <CardDescription>Overall system performance improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-chart-2" />
                    <p className="text-sm font-medium text-muted-foreground">Read Throughput</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">2× Increase</p>
                  <p className="text-xs text-muted-foreground mt-1">With replica scaling</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-chart-2" />
                    <p className="text-sm font-medium text-muted-foreground">Query Performance</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">88% Faster</p>
                  <p className="text-xs text-muted-foreground mt-1">1.5s → 180ms average</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-chart-2" />
                    <p className="text-sm font-medium text-muted-foreground">CPU Utilization</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">28% Reduction</p>
                  <p className="text-xs text-muted-foreground mt-1">From optimizations</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-chart-2" />
                    <p className="text-sm font-medium text-muted-foreground">Recovery Time</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">50% Faster</p>
                  <p className="text-xs text-muted-foreground mt-1">RTO improvement</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-chart-2" />
                    <p className="text-sm font-medium text-muted-foreground">SLA Compliance</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground mt-1">At 2× traffic load</p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-chart-2" />
                    <p className="text-sm font-medium text-muted-foreground">System Uptime</p>
                  </div>
                  <p className="text-2xl font-bold text-foreground">99.98%</p>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Architecture Components</CardTitle>
              <CardDescription>Detailed specifications for each infrastructure component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {architectureComponents.map((component, index) => {
                  const Icon = component.icon
                  return (
                    <div key={index} className="rounded-lg border border-border bg-card p-4 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{component.name}</h3>
                          <p className="text-sm text-muted-foreground">{component.description}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Features</p>
                        <ul className="space-y-1.5">
                          {component.features.map((feature, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-foreground mb-2">Specifications</p>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(component.specs).map(([key, value], idx) => (
                            <div key={idx} className="text-sm">
                              <p className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</p>
                              <p className="font-mono font-medium text-foreground">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dataflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Flow</CardTitle>
              <CardDescription>How queries are routed and processed through the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-1/20 text-sm font-semibold text-chart-1 shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Application Query Routing</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Application layer analyzes incoming queries and routes them via ProxySQL or custom query router.
                      Connection pooling maintains 1,000 active connections for optimal performance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-2/20 text-sm font-semibold text-chart-2 shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Write/Read Split</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Write queries (INSERT, UPDATE, DELETE) are sent to MySQL Primary with semi-synchronous
                      replication. Read queries (SELECT) are distributed across 3 replicas using round-robin load
                      balancing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-3/20 text-sm font-semibold text-chart-3 shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Query Optimization & Caching</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Queries run with covering indexes and optimized execution plans. Frequently accessed results are
                      cached in Redis with 15-minute TTL, reducing database load by 40%.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-4/20 text-sm font-semibold text-chart-4 shrink-0">
                    4
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Replication & Synchronization</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Binary logs from Primary are replicated to all replicas with less than 1 second lag. Replicas are
                      geographically distributed across US-East, US-West, and EU regions for low-latency access.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-chart-5/20 text-sm font-semibold text-chart-5 shrink-0">
                    5
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Backup & Disaster Recovery</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Automated backup scripts run via cron: full backups daily at 2 AM, incremental backups every 6
                      hours. Backups stored in S3 with AES-256 encryption. Failover scripts ensure RTO under 3 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimization Strategies</CardTitle>
              <CardDescription>Key techniques for performance improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {optimizationStrategies.map((strategy, index) => (
                  <div key={index} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground">{strategy.strategy}</p>
                      <Badge
                        variant="outline"
                        className={
                          strategy.impact === "High" ? "border-chart-2 text-chart-2" : "border-chart-1 text-chart-1"
                        }
                      >
                        {strategy.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{strategy.description}</p>
                    <p className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1">
                      {strategy.implementation}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stack" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
              <CardDescription>Complete list of technologies powering the infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {technologyStack.map((category, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      {category.category === "Database" && <Database className="h-4 w-4" />}
                      {category.category === "Application" && <Server className="h-4 w-4" />}
                      {category.category === "Caching & Queue" && <Zap className="h-4 w-4" />}
                      {category.category === "Infrastructure" && <Cloud className="h-4 w-4" />}
                      {category.category === "Security" && <Lock className="h-4 w-4" />}
                      {category.category}
                    </h3>
                    <div className="grid gap-3 md:grid-cols-2">
                      {category.technologies.map((tech, idx) => (
                        <div key={idx} className="rounded-lg border border-border bg-card p-3">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-foreground">{tech.name}</p>
                            {tech.version !== "-" && (
                              <Badge variant="outline" className="text-xs">
                                {tech.version}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{tech.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Topology</CardTitle>
              <CardDescription>Geographic distribution and regional infrastructure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deploymentTopology.map((region, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                          <Network className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{region.region}</p>
                          <p className="text-sm text-muted-foreground">{region.role}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Latency: {region.latency}</Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-2">Deployed Components</p>
                      <div className="flex flex-wrap gap-2">
                        {region.components.map((component, idx) => (
                          <Badge key={idx} variant="secondary">
                            {component}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">High Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Uptime SLA</span>
                  <span className="font-mono font-medium">99.95%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Actual Uptime</span>
                  <span className="font-mono font-medium text-chart-2">99.98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Failover Time</span>
                  <span className="font-mono font-medium">{"< 3 min"}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Scalability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Capacity</span>
                  <span className="font-mono font-medium">6.4K req/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Max Tested</span>
                  <span className="font-mono font-medium">8.9K req/s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Headroom</span>
                  <span className="font-mono font-medium text-chart-2">39%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Encryption</span>
                  <Badge variant="default" className="bg-chart-2">
                    AES-256
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">TLS Version</span>
                  <Badge variant="default" className="bg-chart-2">
                    1.3
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Access Control</span>
                  <Badge variant="default" className="bg-chart-2">
                    IAM
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
