"use client"

export function SalesAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">Sales Analytics</h2>
        <select className="px-4 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Revenue Chart */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-bold text-foreground mb-4">Revenue Trend</h3>
        <div className="h-64 flex items-end justify-around gap-2">
          {[40, 65, 50, 75, 60, 85, 70].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-muted-foreground">Day {i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Average Order Value</p>
          <p className="text-3xl font-bold text-primary">$149.99</p>
          <p className="text-xs text-green-600 font-medium mt-2">+5.2% from last period</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground mb-2">Conversion Rate</p>
          <p className="text-3xl font-bold text-accent">3.8%</p>
          <p className="text-xs text-green-600 font-medium mt-2">+0.5% from last period</p>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-bold text-foreground mb-6">Category Performance</h3>
        <div className="space-y-4">
          {[
            { category: "Electronics", percentage: 45, revenue: "$5,580" },
            { category: "Fashion", percentage: 30, revenue: "$3,735" },
            { category: "Home & Living", percentage: 25, revenue: "$3,112" },
          ].map((cat, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-foreground">{cat.category}</span>
                <span className="text-sm font-semibold text-primary">{cat.revenue}</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{cat.percentage}% of sales</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
