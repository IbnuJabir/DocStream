import { create } from 'zustand';

// Define the store
export const usePaymentDataStore = create((set) => ({
  paymentData: null,
  
  changePaymentData: (data) => {
    set({ paymentData: data });
  },
}));
