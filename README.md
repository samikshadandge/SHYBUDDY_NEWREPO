
# ShyBuddy Project

This project is a full-stack web application that integrates with MongoDB and performs tasks like processing payments based on different payment cycles.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (or use a cloud database like MongoDB Atlas)
- [Git](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/samikshadandge/shybuddy.git
cd shybuddy
```

### 2. Install Dependencies

#### Backend (Node.js & Express)

1. Navigate to the backend folder (if applicable):

```bash
cd backend
```

2. Install the required dependencies:

```bash
npm install
```

#### Frontend (React)

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Install the required dependencies:

```bash
npm install
```

### 3. Setup MongoDB Database

If you're using a local MongoDB instance, make sure MongoDB is running on your machine. Otherwise, you can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution.

Update the MongoDB connection URI in your backend code:

```js
// backend/config/db.js or wherever your database URI is defined
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/paymentCycleDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
```

If you're using MongoDB Atlas, replace `localhost` with your MongoDB Atlas connection string.

### 4. Run the Backend Server

In the `backend` directory, run the following command to start the server:

```bash
npm start
```

By default, this will run the server on `http://localhost:5000`.

### 5. Run the Frontend React Application

1. In the `frontend` directory, run the following command to start the React app:

```bash
npm start
```

This will launch the React app in the browser at `http://localhost:3000`.

### 6. Use the Application

Once the backend and frontend are running:

1. Open your browser and go to `http://localhost:3000` to interact with the payment cycle UI.
2. Select either **Weekly Sheets** or **Early Sheets** for processing payments.
3. The **Process Payment** button will only be enabled if there are orders to process, based on the selected cycle type.

### 7. Database Models

The backend includes a MongoDB model for storing orders:

```js
const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true },
  orderRate: { type: Number },
  CODcharges: { type: Number },
  usersId: { type: String, required: true },
  status: { type: String, enum: ['Delivered', 'Pending'], required: true },
  shippingDate: { type: Date, required: true },
  pickupTime: { type: Date },
  deadWeight: { type: mongoose.Types.Decimal128 },
  length: { type: mongoose.Types.Decimal128 },
  breadth: { type: mongoose.Types.Decimal128 },
  height: { type: mongoose.Types.Decimal128 },
});

const Order = mongoose.model('Order', orderSchema);
```

### 8. Available API Endpoints

- **GET `/api/weekly-sheets`** - Fetches all orders for the weekly payment cycle.
- **GET `/api/early-sheets`** - Fetches all orders for the early payment cycle.

### 9. Environment Variables

You can configure environment variables for sensitive data like database URIs and other secrets. Create a `.env` file in the root of the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/paymentCycleDB
PORT=5000
```

### 10. Troubleshooting

If you encounter issues, check the following:

- Make sure MongoDB is running and accessible.
- Ensure you’ve correctly set up your environment variables in the `.env` file.
- Check the backend and frontend logs for error messages.

### 11. Future Improvements

- Add authentication and authorization for users.
- Implement unit tests and integration tests.
- Add more detailed error handling for API responses.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
