import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const PaymentCycle = () => {
  const [orders, setOrders] = useState([]);
  const [cycleType, setCycleType] = useState('weekly'); // 'weekly' or 'early'
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const endpoint = cycleType === 'weekly' ? '/api/weekly-sheets' : '/api/early-sheets';
        const response = await axios.get(`http://localhost:5000${endpoint}`);
        setOrders(response.data.orders);
        setButtonEnabled(response.data.orders.length > 0);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, [cycleType]);

  const handlePayment = () => {
    alert(`Processing ${cycleType} payment for ${orders.length} orders.`);
  };

  return (
    <div>
      <h1>Payment Cycle</h1>
      <div>
        <label>
          <input
            type="radio"
            value="weekly"
            checked={cycleType === 'weekly'}
            onChange={() => setCycleType('weekly')}
          />
          Weekly Sheets
        </label>
        <label>
          <input
            type="radio"
            value="early"
            checked={cycleType === 'early'}
            onChange={() => setCycleType('early')}
          />
          Early Sheets
        </label>
      </div>
      <button disabled={!buttonEnabled} onClick={handlePayment}>
        Process Payment
      </button>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <strong>Order ID:</strong> {order.orderId} | <strong>Amount:</strong> ${order.orderRate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentCycle;
