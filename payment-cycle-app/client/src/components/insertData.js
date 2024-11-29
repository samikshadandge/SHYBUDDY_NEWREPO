const mongoose = require('mongoose');
const Order =require('models/Order');
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/paymentCycleDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

// Insert Data into the Database
const insertData = async () => {
  await connectDB();

  const sampleOrders = [
    {
      orderId: 201,
      orderRate: 600,
      CODcharges: 50,
      usersId: 'USR201',
      status: 'Delivered',
      shippingDate: new Date('2024-11-25'),
      pickupTime: new Date('2024-11-24'),
      deadWeight: 5.5,
      length: 20.5,
      breadth: 10.0,
      height: 15.0,
    },
    {
      orderId: 202,
      orderRate: 800,
      CODcharges: 60,
      usersId: 'USR202',
      status: 'Pending',
      shippingDate: new Date('2024-11-26'),
      pickupTime: new Date('2024-11-25'),
      deadWeight: 7.0,
      length: 25.0,
      breadth: 15.0,
      height: 20.0,
    },
    {
      orderId: 203,
      orderRate: 1000,
      CODcharges: 100,
      usersId: 'USR203',
      status: 'Delivered',
      shippingDate: new Date('2024-11-28'),
      pickupTime: new Date('2024-11-27'),
      deadWeight: 9.0,
      length: 30.0,
      breadth: 20.0,
      height: 25.0,
    },
  ];

  try {
    await Order.deleteMany(); // Clear existing data
    console.log('Existing data cleared.');

    const insertedOrders = await Order.insertMany(sampleOrders); // Insert new data
    console.log('Data inserted successfully:', insertedOrders);
  } catch (err) {
    console.error('Error inserting data:', err.message);
  } finally {
    mongoose.connection.close(); // Close the connection
    console.log('Database connection closed.');
  }
};

// Run the function
insertData();
