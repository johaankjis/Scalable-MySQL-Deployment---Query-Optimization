"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  Bar,
  BarChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, Gauge, TrendingUp, AlertTriangle, Play, Cpu, HardDrive, Network } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const latencyData = [
  { time: "0s", p50: 45, p95: 120, p99: 180 },
  { time: "30s", p50: 48, p95: 125, p99: 185 },
  { time: "60s", p50: 52, p95: 135, p99: 195 },
  { time: "90s", p50: 58, p95: 145, p99: 210 },
  { time: "120s", p50: 62, p95: 155, p99: 225 },
  { time: "150s", p50: 55, p95: 140, p99: 200 },
  { time: "180s", p50: 50, p95: 130, p99: 190 },
]

const throughputData = [
  { time: "0s", requests: 3200, connections: 450 },
  { time: "30s", requests: 4800, connections: 680 },
  { time: "60s", requests: 6400, connections: 920 },
  { time: "90s", requests: 6800, connections: 980 },
  { time: "120s", requests: 6400, connections: 920 },
  { time: "150s", requests: 5200, connections: 750 },
  { time: "180s", requests: 3200, connections: 450 },
]

const resourceUtilization = [
  { time: "0s", cpu: 35, memory: 42, disk: 28, network: 25 },
  { time: "30s", cpu: 52, memory: 58, disk: 45, network: 48 },
  { time: "60s", cpu: 68, memory: 72, disk: 62, network: 65 },
  { time: "90s", cpu: 75, memory: 78, disk: 68, network: 72 },
  { time: "120s", cpu: 70, memory: 74, disk: 64, network: 68 },
  { time: "150s", cpu: 58, memory: 62, disk: 52, network: 55 },
  { time: "180s", cpu: 38, memory: 45, disk: 32, network: 28 },
]

const errorDistribution = [
  { type: "Timeouts", count: 45, percentage: 45 },
  { type: "Connection Errors", count: 32, percentage: 32 },
  { type: "Query Failures", count: 15, percentage: 15 },
  { type: "Lock Timeouts", count: 8, percentage: 8 },
]

const loadTests = [
  {
    name: "Baseline Load",
    traffic: "1×",
    p95: "125ms",
    p99: "185ms",
    throughput: "3.2K/s",
    errors: "0.01%",
    status: "passed",
  },
  {
    name: "Peak Traffic",
    traffic: "2×",
    p95: "155ms",
    p99: "225ms",
    throughput: "6.4K/s",
    errors: "0.02%",
    status: "passed",
  },
  {
    name: "Stress Test",
    traffic: "3×",
    p95: "280ms",
    p99: "420ms",
    throughput: "8.9K/s",
    errors: "0.15%",
    status: "warning",
  },
]

export function LoadTestingMetrics() {
  const [trafficMultiplier, setTrafficMultiplier] = useState([2])
  const [testDuration, setTestDuration] = useState([180])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Load Testing & Capacity Planning</h2>
        <p className="text-muted-foreground mt-1">
          Comprehensive performance validation and capacity analysis under simulated traffic
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P95 Latency</CardTitle>
            <Gauge className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">155ms</div>
            <p className="text-xs text-muted-foreground">At 2× traffic load</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">P99 Latency</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">225ms</div>
            <p className="text-xs text-muted-foreground">Within SLA target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Throughput</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8.9K/s</div>
            <p className="text-xs text-muted-foreground">At 3× traffic load</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">100%</div>
            <p className="text-xs text-muted-foreground">No violations at 2×</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Load Test Configuration</CardTitle>
              <CardDescription>Configure and run custom load tests</CardDescription>
            </div>
            <Button size="sm">
              <Play className="mr-2 h-4 w-4" />
              Run Test
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="traffic-multiplier">Traffic Multiplier</Label>
              <span className="text-sm font-mono font-medium">{trafficMultiplier[0]}×</span>
            </div>
            <Slider
              id="traffic-multiplier"
              min={1}
              max={5}
              step={0.5}
              value={trafficMultiplier}
              onValueChange={setTrafficMultiplier}
            />
            <p className="text-xs text-muted-foreground">
              Baseline: 3,200 requests/sec • Test load: {(3200 * trafficMultiplier[0]).toLocaleString()} requests/sec
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="test-duration">Test Duration</Label>
              <span className="text-sm font-mono font-medium">{testDuration[0]}s</span>
            </div>
            <Slider
              id="test-duration"
              min={60}
              max={600}
              step={30}
              value={testDuration}
              onValueChange={setTestDuration}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 180-300 seconds for accurate performance profiling
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Ramp-up Time</p>
              <p className="text-sm font-medium">30 seconds</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Connection Pool</p>
              <p className="text-sm font-medium">1,000 connections</p>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground mb-1">Query Mix</p>
              <p className="text-sm font-medium">70% Read / 30% Write</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="latency" className="space-y-4">
        <TabsList>
          <TabsTrigger value="latency">Latency</TabsTrigger>
          <TabsTrigger value="throughput">Throughput</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="errors">Errors</TabsTrigger>
          <TabsTrigger value="results">Test Results</TabsTrigger>
        </TabsList>

        <TabsContent value="latency" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latency Distribution Under Load</CardTitle>
              <CardDescription>P50, P95, and P99 latency during 2× traffic surge test</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  p50: {
                    label: "P50",
                    color: "hsl(var(--chart-2))",
                  },
                  p95: {
                    label: "P95",
                    color: "hsl(var(--chart-1))",
                  },
                  p99: {
                    label: "P99",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={latencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}ms`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="p50" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="p95" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="p99" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">P50 Latency</CardTitle>
                <CardDescription>Median response time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-foreground">50ms</div>
                <Progress value={16.7} className="h-2" />
                <p className="text-xs text-muted-foreground">16.7% of SLA target (300ms)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">P95 Latency</CardTitle>
                <CardDescription>95th percentile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-foreground">130ms</div>
                <Progress value={43.3} className="h-2" />
                <p className="text-xs text-muted-foreground">43.3% of SLA target (300ms)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">P99 Latency</CardTitle>
                <CardDescription>99th percentile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-3xl font-bold text-foreground">190ms</div>
                <Progress value={63.3} className="h-2" />
                <p className="text-xs text-muted-foreground">63.3% of SLA target (300ms)</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="throughput" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Throughput & Connections</CardTitle>
              <CardDescription>Requests per second and active connections during load test</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  requests: {
                    label: "Requests/sec",
                    color: "hsl(var(--chart-1))",
                  },
                  connections: {
                    label: "Connections",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={throughputData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="connections"
                      stroke="hsl(var(--chart-3))"
                      fill="hsl(var(--chart-3))"
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Peak Throughput</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Maximum Requests/sec</span>
                  <span className="font-mono font-medium">6,800</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Requests/sec</span>
                  <span className="font-mono font-medium">5,257</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Requests</span>
                  <span className="font-mono font-medium">946,260</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Connection Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Peak Connections</span>
                  <span className="font-mono font-medium">980</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Connections</span>
                  <span className="font-mono font-medium">736</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pool Utilization</span>
                  <span className="font-mono font-medium">98%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
              <CardDescription>CPU, memory, disk I/O, and network usage during load test</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cpu: {
                    label: "CPU",
                    color: "hsl(var(--chart-1))",
                  },
                  memory: {
                    label: "Memory",
                    color: "hsl(var(--chart-2))",
                  },
                  disk: {
                    label: "Disk I/O",
                    color: "hsl(var(--chart-3))",
                  },
                  network: {
                    label: "Network",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={resourceUtilization}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="time"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="cpu" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="memory" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="disk" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="network" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak CPU</CardTitle>
                <Cpu className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">75%</div>
                <Progress value={75} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Memory</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">78%</div>
                <Progress value={78} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Disk I/O</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">68%</div>
                <Progress value={68} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Peak Network</CardTitle>
                <Network className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">72%</div>
                <Progress value={72} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Distribution</CardTitle>
              <CardDescription>Breakdown of errors encountered during stress testing (3× load)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Count",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={errorDistribution} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      type="number"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      type="category"
                      dataKey="type"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={140}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="hsl(var(--chart-4))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {errorDistribution.map((error, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{error.type}</CardTitle>
                    <Badge variant="outline">{error.percentage}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Error Count</span>
                    <span className="font-mono font-medium">{error.count}</span>
                  </div>
                  <Progress value={error.percentage} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Total error rate at 3× load: 0.15% (100 errors out of 66,667 requests). Most errors are timeouts due to
              connection pool saturation. Consider increasing pool size for sustained 3× capacity.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {loadTests.map((test, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{test.name}</CardTitle>
                    <Badge
                      variant={test.status === "passed" ? "default" : "outline"}
                      className={test.status === "warning" ? "border-chart-4 text-chart-4" : ""}
                    >
                      {test.status}
                    </Badge>
                  </div>
                  <CardDescription>Traffic: {test.traffic} baseline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">P95 Latency</span>
                    <span className="font-mono font-medium text-foreground">{test.p95}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">P99 Latency</span>
                    <span className="font-mono font-medium text-foreground">{test.p99}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Throughput</span>
                    <span className="font-mono font-medium text-foreground">{test.throughput}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Error Rate</span>
                    <span className="font-mono font-medium text-foreground">{test.errors}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Findings</CardTitle>
              <CardDescription>Load testing insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-2/20 mt-0.5">
                  <TrendingUp className="h-3.5 w-3.5 text-chart-2" />
                </div>
                <div>
                  <p className="font-medium text-foreground">2× Traffic Capacity Validated</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    System handles double baseline traffic with P99 latency at 225ms, well within SLA targets of 300ms.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-1/20 mt-0.5">
                  <Activity className="h-3.5 w-3.5 text-chart-1" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Replication Scaling Effective</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Read replicas successfully distributed load, maintaining consistent performance across all nodes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-chart-4/20 mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-chart-4" />
                </div>
                <div>
                  <p className="font-medium text-foreground">3× Load Approaching Limits</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    At 3× traffic, P99 latency reaches 420ms with 0.15% error rate. Consider additional replicas for
                    sustained 3× capacity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
