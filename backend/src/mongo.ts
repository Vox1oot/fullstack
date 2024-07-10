import mongoose from 'mongoose';

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const [password, name, phone] = process.argv.slice(2);
const URL = `mongodb+srv://voxfoot:${password}@cluster0.zbfxzdg.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(URL);

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const PhonebookNote = mongoose.model('Note', phonebookSchema);

if (!(name && phone)) {
  PhonebookNote.find({}).then((allNotes) => {
    const notes = allNotes.map((note) => `${note.name} ${note.phone}`);
    const result = `телефонная книга:\n${notes.join('\n')}`;

    console.log(result);
    mongoose.connection.close();
  });
}

if (name && phone) {
  const note = new PhonebookNote({
    name,
    phone,
  });

  note.save().then(() => {
    console.log(`added ${name} number ${phone} to phonebook`);
    mongoose.connection.close();
  });
}
