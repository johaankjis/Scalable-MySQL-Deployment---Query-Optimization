"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Zap, TrendingDown, Cpu, Clock, Play, AlertTriangle, CheckCircle2, Info, Sparkles } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const performanceData = [
  { query: "User Lookup", before: 1500, after: 180 },
  { query: "Order History", before: 2200, after: 320 },
  { query: "Product Search", before: 1800, after: 240 },
  { query: "Analytics", before: 3500, after: 450 },
  { query: "Dashboard", before: 1200, after: 150 },
]

const optimizations = [
  {
    query: "SELECT * FROM users WHERE email = ?",
    issue: "Full table scan",
    solution: "Added covering index on email column",
    improvement: "88% faster",
    before: "1.5s",
    after: "180ms",
  },
  {
    query: "SELECT orders.* FROM orders JOIN users...",
    issue: "Inefficient join",
    solution: "Rewrote with subquery + index on user_id",
    improvement: "85% faster",
    before: "2.2s",
    after: "320ms",
  },
  {
    query: "SELECT COUNT(*) FROM products WHERE...",
    issue: "Slow aggregation",
    solution: "Added composite index on category + status",
    improvement: "87% faster",
    before: "1.8s",
    after: "240ms",
  },
]

const executionPlanSteps = [
  { step: "Table Scan", cost: 1200, rows: 50000, time: "850ms" },
  { step: "Index Seek", cost: 45, rows: 120, time: "12ms" },
  { step: "Nested Loop", cost: 180, rows: 120, time: "45ms" },
  { step: "Sort", cost: 90, rows: 120, time: "28ms" },
]

const queryHistoryData = [
  { time: "00:00", avgTime: 1200, p95: 1800, p99: 2400 },
  { time: "04:00", avgTime: 980, p95: 1500, p99: 2100 },
  { time: "08:00", avgTime: 1450, p95: 2200, p99: 3000 },
  { time: "12:00", avgTime: 320, p95: 480, p99: 650 },
  { time: "16:00", avgTime: 280, p95: 420, p99: 580 },
  { time: "20:00", avgTime: 310, p95: 460, p99: 620 },
]

export function QueryOptimization() {
  const [queryInput, setQueryInput] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    issues: Array<{ severity: "high" | "medium" | "low"; message: string }>
    recommendations: string[]
    estimatedImprovement: number
  } | null>(null)

  const handleAnalyzeQuery = () => {
    setAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setAnalysisResult({
        issues: [
          { severity: "high", message: "Full table scan detected on 'users' table (50,000 rows)" },
          { severity: "medium", message: "Missing index on frequently filtered column 'email'" },
          { severity: "low", message: "SELECT * returns unnecessary columns" },
        ],
        recommendations: [
          "CREATE INDEX idx_users_email ON users(email)",
          "Replace SELECT * with specific column names",
          "Consider adding a composite index on (email, status) for better performance",
          "Use EXPLAIN ANALYZE to verify execution plan improvements",
        ],
        estimatedImprovement: 85,
      })
      setAnalyzing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Query Optimization</h2>
        <p className="text-muted-foreground mt-1">
          Analyze queries, identify bottlenecks, and apply AI-powered optimizations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Query Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">180ms</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-chart-2">-88%</span> from 1.5s
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Reduction</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">28%</div>
            <p className="text-xs text-muted-foreground">Lower DB CPU usage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Slow Queries</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground">Down from 47</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indexes Added</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground">Covering indexes</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Powered Query Analyzer
          </CardTitle>
          <CardDescription>Paste your SQL query to get instant optimization recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="SELECT * FROM users WHERE email = 'user@example.com'..."
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
            className="font-mono text-sm min-h-[120px]"
          />
          <Button onClick={handleAnalyzeQuery} disabled={!queryInput || analyzing} className="w-full sm:w-auto">
            <Play className="h-4 w-4 mr-2" />
            {analyzing ? "Analyzing..." : "Analyze Query"}
          </Button>

          {analysisResult && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Issues Detected
                </h4>
                {analysisResult.issues.map((issue, index) => (
                  <Alert key={index} variant={issue.severity === "high" ? "destructive" : "default"}>
                    <AlertDescription className="flex items-start gap-2">
                      <Badge variant={issue.severity === "high" ? "destructive" : "outline"} className="mt-0.5">
                        {issue.severity}
                      </Badge>
                      <span className="text-sm">{issue.message}</span>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-chart-2" />
                  Recommendations
                </h4>
                <div className="space-y-2">
                  {analysisResult.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="h-5 w-5 rounded-full bg-chart-2/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-chart-2">{index + 1}</span>
                      </div>
                      <span className="text-muted-foreground">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Performance Improvement</span>
                  <span className="font-semibold text-chart-2">{analysisResult.estimatedImprovement}%</span>
                </div>
                <Progress value={analysisResult.estimatedImprovement} className="h-2" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="execution">Execution Plans</TabsTrigger>
          <TabsTrigger value="history">Query History</TabsTrigger>
          <TabsTrigger value="optimizations">Applied Optimizations</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query Performance Improvements</CardTitle>
              <CardDescription>Execution time before and after optimization (ms)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  before: {
                    label: "Before",
                    color: "hsl(var(--chart-4))",
                  },
                  after: {
                    label: "After",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis
                      dataKey="query"
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
                    <Bar dataKey="before" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="after" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="execution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query Execution Plan Analysis</CardTitle>
              <CardDescription>Cost breakdown and row estimates for each operation</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  cost: {
                    label: "Cost",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={executionPlanSteps} layout="vertical">
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
                      dataKey="step"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      width={100}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="cost" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            {executionPlanSteps.map((step, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base">{step.step}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Cost</span>
                    <span className="font-mono font-medium">{step.cost}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Rows Processed</span>
                    <span className="font-mono font-medium">{step.rows.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Execution Time</span>
                    <span className="font-mono font-medium">{step.time}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query Performance Over Time</CardTitle>
              <CardDescription>Average, P95, and P99 response times (ms)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgTime: {
                    label: "Average",
                    color: "hsl(var(--chart-1))",
                  },
                  p95: {
                    label: "P95",
                    color: "hsl(var(--chart-3))",
                  },
                  p99: {
                    label: "P99",
                    color: "hsl(var(--chart-4))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={queryHistoryData}>
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
                    <Line
                      type="monotone"
                      dataKey="avgTime"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line type="monotone" dataKey="p95" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="p99" stroke="hsl(var(--chart-4))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Significant performance improvement detected at 12:00 after applying index optimizations. Query times
              reduced by 78% and have remained stable since deployment.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="optimizations" className="space-y-4">
          {optimizations.map((opt, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-mono text-sm">{opt.query}</CardTitle>
                    <CardDescription className="mt-2">{opt.issue}</CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-4">
                    {opt.improvement}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Solution</p>
                  <p className="text-sm text-muted-foreground">{opt.solution}</p>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Before: </span>
                    <span className="font-mono font-medium text-destructive">{opt.before}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">After: </span>
                    <span className="font-mono font-medium text-chart-2">{opt.after}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
