const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://mohammadtarique661998:Bikers25@datacluster.oxxufpl.mongodb.net/Food-O-Mania-Database?retryWrites=true&w=majority&appName=DataCluster"; //add database name i.e. Food-O-Mania-Database

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);

    const db = mongoose.connection.db;
    const fetchData = db.collection("food_items");

    const data = await fetchData.find({}).toArray();

    if (data) {
      const allCategory = db.collection("food_category");
      const categoryData = await allCategory.find({}).toArray();

      global.Food_Items_All = data; //by declaring a global variable we can use/update it from anywhere
      //console.log(global.Food_Items_All);
      global.Food_Category = categoryData;
      //console.log(global.Food_Category);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
