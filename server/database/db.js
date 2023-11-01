import mongoose from 'mongoose';

const databaseConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://dorianoriginaldesings:0zWmM80yz8q4PYT3@tasks-crud.swenicz.mongodb.net/crud?retryWrites=true&w=majority'
    );
    console.log('Connected to database');
  } catch (err) {
    console.error(`Connection error`, err);
  }
};

export { databaseConnect };
