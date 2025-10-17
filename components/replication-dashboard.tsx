"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Activity, Database, Clock, TrendingUp } from "lucide-react"

// Mock data for replication metrics
const replicationData = [
  { time: "00:00", primary: 2400, replica1: 2380, replica2: 2390 },
  { time: "04:00", primary: 2210, replica1: 2200, replica2: 2195 },
  { time: "08:00", primary: 2890, replica1: 2870, replica2: 2880 },
  { time: "12:00", primary: 3200, replica1: 3180, replica2: 3190 },
  { time: "16:00", primary: 3100, replica1: 3085, replica2: 3090 },
  { time: "20:00", primary: 2600, replica1: 2590, replica2: 2585 },
  { time: "23:59", primary: 2300, replica1: 2290, replica2: 2295 },
]

const replicas = [
  {
    name: "MySQL Primary",
    status: "healthy",
    role: "primary",
    queries: "3.2K/s",
    lag: "0ms",
    cpu: "42%",
    memory: "8.2GB",
  },
  {
    name: "Replica 1 (us-east)",
    status: "healthy",
    role: "replica",
    queries: "1.8K/s",
    lag: "12ms",
    cpu: "28%",
    memory: "7.9GB",
  },
  {
    name: "Replica 2 (us-west)",
    status: "healthy",
    role: "replica",
    queries: "1.6K/s",
    lag: "18ms",
    cpu: "24%",
    memory: "7.8GB",
  },
]

export function ReplicationDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Replication & High Availability</h2>
        <p className="text-muted-foreground mt-1">
          Read/write split strategy with MySQL replicas - 2× read throughput increase
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Throughput</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">6.6K/s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">+100%</span> from baseline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Replication Lag</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">15ms</div>
            <p className="text-xs text-muted-foreground">Within SLA target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Replicas</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">2/2</div>
            <p className="text-xs text-muted-foreground">All replicas healthy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">99.98%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Query Distribution</CardTitle>
          <CardDescription>Real-time query throughput across primary and replicas</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              primary: {
                label: "Primary",
                color: "hsl(var(--chart-1))",
              },
              replica1: {
                label: "Replica 1",
                color: "hsl(var(--chart-2))",
              },
              replica2: {
                label: "Replica 2",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={replicationData}>
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
                  tickFormatter={(value) => `${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="primary"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="replica1"
                  stackId="1"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="replica2"
                  stackId="1"
                  stroke="hsl(var(--chart-3))"
                  fill="hsl(var(--chart-3))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {replicas.map((replica) => (
          <Card key={replica.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{replica.name}</CardTitle>
                <Badge variant={replica.status === "healthy" ? "default" : "destructive"}>{replica.status}</Badge>
              </div>
              <CardDescription className="capitalize">{replica.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Queries/sec</span>
                <span className="font-mono font-medium text-foreground">{replica.queries}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Replication Lag</span>
                <span className="font-mono font-medium text-foreground">{replica.lag}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">CPU Usage</span>
                <span className="font-mono font-medium text-foreground">{replica.cpu}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Memory</span>
                <span className="font-mono font-medium text-foreground">{replica.memory}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
