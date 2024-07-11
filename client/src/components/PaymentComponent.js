import React from 'react';
import { useCounterStore } from '../store/useCounterStore';

function PaymentComponent() {
  const paymentInfo = useCounterStore((state) => state.paymentInfo);
  const changePaymentData = useCounterStore((state) => state.changePaymentData);

  const handleUpdatePayment = () => {
    const newPaymentData = [{ id: 1, amount: 100 }];
    changePaymentData(newPaymentData);
  };

  return (
    <div>
      <h1>Payment Info</h1>
      <pre>{JSON.stringify(paymentInfo, null, 2)}</pre>
      <button onClick={handleUpdatePayment}>Update Payment Info</button>
    </div>
  );
}

export default PaymentComponent;
