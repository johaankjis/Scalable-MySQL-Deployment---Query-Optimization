# Scalable MySQL Deployment & Query Optimization

A comprehensive Next.js dashboard application for managing, monitoring, and optimizing MySQL database deployments. This interactive platform provides real-time insights into database replication, query performance, backup systems, load testing metrics, and system architecture.

![MySQL Operations Dashboard](https://img.shields.io/badge/MySQL-8.0.35-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Features

### 1. **Replication Dashboard**
- Real-time monitoring of MySQL primary and replica servers
- Geographic distribution tracking across multiple regions (US-East, US-West, EU)
- Performance metrics including query throughput, replication lag, CPU, and memory usage
- Visual representations of replication data flow over time

### 2. **Query Optimization**
- Interactive query analyzer with EXPLAIN plan visualization
- Performance comparisons (before/after optimization)
- Common optimization strategies and best practices
- Real-time query execution statistics
- Index recommendations and analysis

### 3. **Backup & Failover Management**
- Automated backup scheduling (full and incremental)
- Point-in-time recovery (PITR) capabilities
- Backup history and status tracking
- Manual backup initiation
- Failover simulation and testing
- Recovery time tracking

### 4. **Load Testing Metrics**
- Real-time performance monitoring during load tests
- Latency percentiles (p50, p95, p99)
- Throughput and connection tracking
- Resource utilization (CPU, memory, disk, network)
- Error rate monitoring
- Concurrent user simulation controls

### 5. **System Architecture Visualization**
- Interactive architecture diagrams
- Component specifications and details
- Data flow visualization
- High availability and disaster recovery planning
- Monitoring and security infrastructure overview

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.2.4
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI
- **Charts**: Recharts
- **Icons**: Lucide React

### Key Dependencies
- **Form Handling**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode
- **Date Handling**: date-fns
- **Notifications**: Sonner (toast notifications)
- **Analytics**: Vercel Analytics

## 📦 Installation

### Prerequisites
- Node.js 20 or higher
- pnpm (recommended) or npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/Scalable-MySQL-Deployment---Query-Optimization.git
   cd Scalable-MySQL-Deployment---Query-Optimization
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Development Mode
```bash
pnpm dev
```
Runs the application in development mode with hot-reload enabled.

### Build for Production
```bash
pnpm build
```
Creates an optimized production build.

### Start Production Server
```bash
pnpm start
```
Starts the production server (requires build first).

### Linting
```bash
pnpm lint
```
Runs ESLint to check for code quality issues.

## 📁 Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page with tab navigation
├── components/              # React components
│   ├── backup-failover.tsx  # Backup & failover management UI
│   ├── load-testing-metrics.tsx  # Load testing dashboard
│   ├── query-optimization.tsx    # Query optimization tools
│   ├── replication-dashboard.tsx # Replication monitoring
│   ├── system-architecture.tsx   # Architecture visualization
│   ├── theme-provider.tsx   # Theme context provider
│   └── ui/                  # Reusable UI components (Radix-based)
├── hooks/                   # Custom React hooks
├── lib/                     # Utility functions and libraries
├── public/                  # Static assets
├── styles/                  # Additional stylesheets
├── components.json          # shadcn/ui configuration
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.mjs      # PostCSS configuration
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🎨 Key Components

### ReplicationDashboard
Monitors MySQL primary-replica architecture with:
- Real-time query throughput metrics
- Replication lag monitoring
- Server health status indicators
- Resource utilization tracking (CPU, memory)

### QueryOptimization
Interactive query analyzer featuring:
- EXPLAIN plan visualization
- Before/after performance comparisons
- Optimization suggestions
- Index analysis and recommendations
- Query execution timeline

### BackupFailover
Comprehensive backup management with:
- Automated backup scheduling
- Backup history and status
- Manual backup triggers
- Point-in-time recovery (PITR)
- Failover simulation capabilities

### LoadTestingMetrics
Performance testing dashboard showing:
- Latency percentiles over time
- Throughput and connection metrics
- Resource utilization graphs
- Error rate monitoring
- Configurable load test parameters

### SystemArchitecture
Visual representation of:
- Application layer architecture
- MySQL primary-replica topology
- Backup infrastructure
- Monitoring and security systems
- Data flow and communication patterns

## 🔧 Configuration

### Next.js Configuration
The project uses Next.js 15 with the App Router. Configuration is in `next.config.mjs`:
- TypeScript build errors are ignored (development convenience)
- Images are unoptimized for portability

### TypeScript Configuration
Strict type checking is enabled with modern ES6+ features and Next.js plugin support.

### Tailwind CSS
Configured with Tailwind CSS 4.1.9 and the animate plugin for smooth transitions and animations.

## 🌐 Database Architecture

This dashboard simulates/monitors a production-grade MySQL deployment with:

- **Primary Server**: Handles all write operations
  - MySQL 8.0.35
  - InnoDB storage engine
  - 32 GB buffer pool
  - 8 vCPUs
  
- **Replica Servers**: Distributed read replicas
  - 3 replicas across US-East, US-West, and EU regions
  - Async replication with < 1 second lag
  - Load balanced via ProxySQL
  
- **Backup System**: Automated backup infrastructure
  - Daily full backups
  - 6-hour incremental backups
  - Point-in-time recovery capability
  - S3 storage with encryption

## 🚦 Performance Optimizations

The dashboard demonstrates various MySQL optimization techniques:
- Index optimization (covering indexes, composite indexes)
- Query rewriting and optimization
- Connection pooling
- Query caching with Redis
- Read-write splitting
- Load balancing across replicas

## 📊 Monitoring Features

- Real-time metrics visualization
- Historical data tracking
- Performance trend analysis
- Alert thresholds and notifications
- Resource utilization monitoring
- Query performance analytics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available for educational and commercial use.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Note**: This is a dashboard/visualization application. For actual MySQL deployment and optimization, you would need to connect this frontend to real MySQL instances and implement the backend API endpoints.
