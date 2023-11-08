import mongoose from 'mongoose';

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dorianoriginaldesings:PruxZHLoKffbfjGk@tasks-crud.swenicz.mongodb.net/crud?retryWrites=true&w=majority'
    );
    console.log('Connected to database');
  } catch (err) {
    console.error(`Connection error`, err);
  }
};

export { databaseConnect };
