
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend,
  LineChart,
  Line
} from "recharts";

// Sample data for charts
const expenseData = [
  { name: "Housing", amount: 2500, average: 2000 },
  { name: "Food", amount: 800, average: 650 },
  { name: "Transport", amount: 450, average: 500 },
  { name: "Shopping", amount: 600, average: 400 },
  { name: "Travel", amount: 1200, average: 800 },
  { name: "Investment", amount: 3000, average: 1500 }
];

const portfolioGrowthData = [
  { month: "Jan", actual: 10000, projected: 10000 },
  { month: "Feb", actual: 12000, projected: 11000 },
  { month: "Mar", actual: 18000, projected: 12500 },
  { month: "Apr", actual: 22000, projected: 14000 },
  { month: "May", actual: 27000, projected: 16000 },
  { month: "Jun", actual: 35000, projected: 18500 }
];

const TabButton = ({ active, children, onClick }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg transition-all ${
        active 
          ? "bg-gold-gradient text-charcoal font-semibold" 
          : "text-platinum/70 hover:text-platinum"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const DashboardPreview = () => {
  const [activeTab, setActiveTab] = useState("expenses");

  return (
    <section className="py-20 bg-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gold-gradient"></div>
      <div className="absolute top-1/4 -right-24 w-48 h-48 rounded-full bg-goldLight/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 -left-24 w-64 h-64 rounded-full bg-emerald/5 blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Premium Dashboard</h2>
          <p className="text-platinum/70 max-w-2xl mx-auto">
            Track your journey to financial independence with our comprehensive analytics tools.
          </p>
        </div>

        <div className="flex justify-center mb-8 gap-4">
          <TabButton 
            active={activeTab === "expenses"} 
            onClick={() => setActiveTab("expenses")}
          >
            Expense Tracking
          </TabButton>
          <TabButton 
            active={activeTab === "portfolio"} 
            onClick={() => setActiveTab("portfolio")}
          >
            Portfolio Growth
          </TabButton>
        </div>
        
        <div className="dashboard-card">
          {activeTab === "expenses" ? (
            <>
              <h3 className="text-2xl font-bold mb-6">Monthly Expenses vs. Benchmark</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={expenseData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                    <XAxis dataKey="name" stroke="#E5E4E2" />
                    <YAxis stroke="#E5E4E2" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #444' }}
                      labelStyle={{ color: '#E5E4E2' }}
                    />
                    <Legend />
                    <Bar dataKey="amount" name="Your Expenses" fill="#FFD700" />
                    <Bar dataKey="average" name="Average" fill="#666666" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-6">Portfolio Growth</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={portfolioGrowthData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#444444" />
                    <XAxis dataKey="month" stroke="#E5E4E2" />
                    <YAxis stroke="#E5E4E2" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #444' }}
                      labelStyle={{ color: '#E5E4E2' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      name="Actual Growth" 
                      stroke="#00C49A" 
                      strokeWidth={3} 
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="projected" 
                      name="Projected" 
                      stroke="#FFD700" 
                      strokeWidth={3} 
                      strokeDasharray="5 5"
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/dashboard" className="gold-button">
            Explore Full Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;
