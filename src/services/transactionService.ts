import { supabase } from '@/lib/supabase';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
  recurring: boolean;
  frequency?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  user_id: string;
  created_at: string;
}

export interface CreateTransaction {
  description: string;
  amount: number;
  category: string;
  type: 'expense' | 'income';
  recurring: boolean;
  frequency?: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
}

export const transactionService = {
  async getUserTransactions(userId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async createTransaction(transaction: CreateTransaction, userId: string) {
    // Convert amount to negative if it's an expense
    const amount = transaction.type === 'expense' 
      ? -Math.abs(transaction.amount) 
      : Math.abs(transaction.amount);

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          ...transaction,
          amount,
          user_id: userId,
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  async updateTransaction(id: number, transaction: Partial<CreateTransaction>, userId: string) {
    // First check if the transaction belongs to the user
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('user_id, type')
      .eq('id', id)
      .single();

    if (existingTransaction?.user_id !== userId) {
      throw new Error('Unauthorized: You can only edit your own transactions');
    }

    // Handle amount conversion if type is changed or amount is updated
    let updatedData: any = { ...transaction };
    
    if (transaction.amount !== undefined) {
      const type = transaction.type || existingTransaction?.type;
      updatedData.amount = type === 'expense' 
        ? -Math.abs(transaction.amount) 
        : Math.abs(transaction.amount);
    } else if (transaction.type !== undefined && transaction.type !== existingTransaction?.type) {
      // If only the type changed, we need to get the current amount and convert it
      const { data: currentTransaction } = await supabase
        .from('transactions')
        .select('amount')
        .eq('id', id)
        .single();
        
      if (currentTransaction) {
        updatedData.amount = transaction.type === 'expense' 
          ? -Math.abs(currentTransaction.amount) 
          : Math.abs(currentTransaction.amount);
      }
    }

    const { data, error } = await supabase
      .from('transactions')
      .update(updatedData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  },

  async deleteTransaction(id: number, userId: string) {
    // First check if the transaction belongs to the user
    const { data: existingTransaction } = await supabase
      .from('transactions')
      .select('user_id')
      .eq('id', id)
      .single();

    if (existingTransaction?.user_id !== userId) {
      throw new Error('Unauthorized: You can only delete your own transactions');
    }

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },
};