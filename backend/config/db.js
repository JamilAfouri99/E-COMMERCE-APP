import mongoose from 'mongoose';

const mongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB Connected Successfully: ${connect.connection.host}`.yellow
        .underline
    );
  } catch (error) {
    console.log(error.message.red.underline.bold);
    process.exit(1);
  }
};

export default mongoDB;
