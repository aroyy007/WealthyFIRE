
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  category: string;
}

const GoalSection = () => {
  const [goals, setGoals] = useState<Goal[]>([
    { id: "1", title: "Emergency Fund", target: 25000, current: 18500, category: "Savings" },
    { id: "2", title: "Retirement Portfolio", target: 500000, current: 127000, category: "Investment" },
    { id: "3", title: "House Down Payment", target: 80000, current: 32000, category: "Savings" }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", target: "", category: "Savings" });

  const addGoal = () => {
    if (newGoal.title && newGoal.target) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        target: Number(newGoal.target),
        current: 0,
        category: newGoal.category
      };
      setGoals([...goals, goal]);
      setNewGoal({ title: "", target: "", category: "Savings" });
      setShowAddForm(false);
    }
  };

  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Financial Goals</h3>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-goldLight text-charcoal hover:bg-goldDark"
        >
          Add Goal
        </Button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 bg-softdark/50 rounded-lg border border-platinum/10 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input
                id="goal-title"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                placeholder="e.g., Emergency Fund"
                className="input-dark"
              />
            </div>
            <div>
              <Label htmlFor="goal-target">Target Amount</Label>
              <Input
                id="goal-target"
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                placeholder="25000"
                className="input-dark"
              />
            </div>
            <div>
              <Label htmlFor="goal-category">Category</Label>
              <select
                id="goal-category"
                value={newGoal.category}
                onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                className="input-dark w-full"
              >
                <option value="Savings">Savings</option>
                <option value="Investment">Investment</option>
                <option value="Debt">Debt Payoff</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={addGoal} className="bg-goldLight text-charcoal hover:bg-goldDark">
              Add Goal
            </Button>
            <Button 
              onClick={() => setShowAddForm(false)}
              variant="outline"
              className="border-platinum/20 text-platinum hover:bg-platinum/10"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          return (
            <div key={goal.id} className="p-4 bg-softdark/30 rounded-lg border border-platinum/10 hover:bg-softdark/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{goal.title}</h4>
                  <p className="text-sm text-platinum/70">{goal.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${goal.current.toLocaleString()}</p>
                  <p className="text-sm text-platinum/70">of ${goal.target.toLocaleString()}</p>
                </div>
              </div>
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-platinum/70">{progress.toFixed(1)}% complete</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GoalSection;
