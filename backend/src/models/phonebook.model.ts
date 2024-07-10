import mongoose, { Document } from 'mongoose';

const url = process.env.MONGODB_URL;

mongoose.set('strictQuery', false);
console.log('connection to', url);

if (!url) {
  throw new Error('url is not defined');
}

mongoose
  .connect(url)
  .then(() => {
    console.log('connection to mongoDB');
  })
  .catch((err: Error) => {
    console.log('error connection to mongoDB', err.message);
  });

const noteSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

noteSchema.set('toJSON', {
  transform: (document: Document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Note = mongoose.model('Note', noteSchema);
