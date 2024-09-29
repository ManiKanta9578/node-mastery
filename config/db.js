import mongoose from "mongoose"

const connect = () => {
    const db = mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
    return db;
}

export default connect;