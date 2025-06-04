
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { transactionService, Transaction } from "@/services/transactionService";
import AddTransactionModal from "@/components/AddTransactionModal";
import FloatingAddButton from "@/components/FloatingAddButton";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const data = await transactionService.getUserTransactions(user.id);
      setTransactions(data);
    } catch (error) {
      toast({
        title: "Error fetching transactions",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsAddModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsAddModalOpen(true);
  };

  const handleDeleteTransaction = async (id: number) => {
    if (!user) return;
    
    try {
      await transactionService.deleteTransaction(id, user.id);
      setTransactions(transactions.filter(t => t.id !== id));
      toast({
        title: "Transaction deleted",
        description: "The transaction has been successfully removed",
      });
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);
    
  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Number(t.amount), 0);
    
  const netBalance = totalIncome + totalExpenses;

  return (
    <div className="min-h-screen bg-charcoal text-platinum">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Financial Dashboard</h1>
            <p className="text-platinum/70">Track, manage, and analyze your finances</p>
          </div>
          <Button onClick={handleAddTransaction} className="gold-button mt-4 md:mt-0">
            Add Transaction
          </Button>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-softdark border-platinum/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-platinum/70">Total Balance</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-platinum/70" />
                <span className={netBalance >= 0 ? "text-emerald" : "text-red-400"}>
                  ${Math.abs(netBalance).toFixed(2)}
                </span>
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-softdark border-platinum/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-platinum/70">Income</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-emerald" />
                <span className="text-emerald">${totalIncome.toFixed(2)}</span>
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card className="bg-softdark border-platinum/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-platinum/70">Expenses</CardDescription>
              <CardTitle className="text-2xl flex items-center">
                <TrendingDown className="mr-2 h-5 w-5 text-red-400" />
                <span className="text-red-400">${Math.abs(totalExpenses).toFixed(2)}</span>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        
        {/* Transactions List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="bg-softdark border border-platinum/20">
            <TabsTrigger value="all" className="data-[state=active]:bg-goldLight data-[state=active]:text-charcoal">
              All Transactions
            </TabsTrigger>
            <TabsTrigger value="income" className="data-[state=active]:bg-goldLight data-[state=active]:text-charcoal">
              Income
            </TabsTrigger>
            <TabsTrigger value="expenses" className="data-[state=active]:bg-goldLight data-[state=active]:text-charcoal">
              Expenses
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <TransactionsList 
              transactions={transactions} 
              isLoading={isLoading}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </TabsContent>
          
          <TabsContent value="income">
            <TransactionsList 
              transactions={transactions.filter(t => t.amount > 0)} 
              isLoading={isLoading}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </TabsContent>
          
          <TabsContent value="expenses">
            <TransactionsList 
              transactions={transactions.filter(t => t.amount < 0)} 
              isLoading={isLoading}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <FloatingAddButton onClick={handleAddTransaction} />
      
      {isAddModalOpen && (
        <AddTransactionModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={fetchTransactions}
          initialData={editingTransaction ? {
            description: editingTransaction.description,
            amount: Math.abs(editingTransaction.amount),
            category: editingTransaction.category,
            type: editingTransaction.type,
            recurring: editingTransaction.recurring,
            frequency: editingTransaction.frequency,
          } : undefined}
          isEditing={!!editingTransaction}
          transactionId={editingTransaction?.id}
        />
      )}
      
      <Footer />
    </div>
  );
};

interface TransactionsListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

const TransactionsList = ({ transactions, isLoading, onEdit, onDelete }: TransactionsListProps) => {
  if (isLoading) {
    return (
      <Card className="bg-softdark border-platinum/20">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-goldLight text-xl">Loading transactions...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions.length === 0) {
    return (
      <Card className="bg-softdark border-platinum/20">
        <CardContent className="p-6">
          <div className="flex flex-col justify-center items-center h-40">
            <p className="text-platinum/70 mb-4">No transactions found</p>
            <Button variant="outline" className="border-goldLight text-goldLight hover:bg-goldLight/10">
              Add Your First Transaction
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-softdark border-platinum/20">
      <CardContent className="p-0">
        <div className="divide-y divide-platinum/10">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.amount > 0 ? 'bg-emerald/20 text-emerald' : 'bg-red-500/20 text-red-400'
                }`}>
                  <DollarSign size={16} />
                </div>
                <div>
                  <h4 className="font-medium">{transaction.description}</h4>
                  <div className="flex items-center text-sm text-platinum/70">
                    <span className="mr-2">{transaction.category}</span>
                    {transaction.recurring && (
                      <span className="flex items-center mr-2">
                        <Calendar size={12} className="mr-1" />
                        {transaction.frequency}
                      </span>
                    )}
                    <span>{format(new Date(transaction.created_at), 'MMM d, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-medium ${
                  transaction.amount > 0 ? 'text-emerald' : 'text-red-400'
                }`}>
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-platinum/70 hover:text-platinum hover:bg-platinum/10"
                    onClick={() => onEdit(transaction)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-platinum/70 hover:text-red-400 hover:bg-red-500/10"
                    onClick={() => onDelete(transaction.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
