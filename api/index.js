// const express = require('express')
// const mongoose = require('mongoose')
// const userRoute = require('./routes/user')
// const authRoute = require('./routes/auth')
// const productRoute = require('./routes/product')
// const cartRoute = require('./routes/cart')
// const orderRoute = require('./routes/order')
// const stripeRoute = require('./routes/stripe')
// const cors = require('cors')

// const app = express()
// dotenv.config()

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => console.log('DB Connection Successfull!'))
//   .catch((err) => {
//     console.log(err)
//   })

// app.use(cors())
// app.use(express.json())
// app.use('/', (req, res) => {
//   res.send(
//     'This is the backend baseurl."\n" Put api/{auth | users | products} to see the data.'
//   )
// })
// app.use('/api/auth', authRoute)
// app.use('/api/users', userRoute)
// app.use('/api/products', productRoute)
// app.use('/api/carts', cartRoute)
// app.use('/api/orders', orderRoute)
// app.use('/api/checkout', stripeRoute)

// app.listen(process.env.PORT || 5000, () => {
//   console.log('Backend server is running!')
// })

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const qrCodeRoutes = require("./routes/qrCodeRoutes.js");
const vehicleRoutes = require("./routes/vehicleRoutes.js");

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

// Routes
app.use("/users", userRoutes);
app.use("/qrcodes", qrCodeRoutes);
app.use("/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
