import { create } from 'zustand'

export const useCounterStore = create((set) => ({
  paymentInfo: [],
  changePaymentData:(data) => {
    set({ paymentInfo: data });
  },
}))

