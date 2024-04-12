const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        // At the time of registration qrcode string will be generated
        qrcode: { type: String },

        isAdmin: {
            type: Boolean,
            default: false,
        },
        vehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
