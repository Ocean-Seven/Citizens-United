const { user, pass } = require('../mongoConfig.js');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(`mongodb+srv://${user}:${pass}@cluster0.6bvqx.mongodb.net/test`, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', () => console.log('Failed to connect to MongoDB cluster'));
db.once('open', () => console.log('Connected to MongoDB cluster'));

const usersSchema = new Schema({
  firebase_id: {type: String, required: true, index: true},
  first_name: String,
  last_name: String,
  neighborhood: String,
  phone_number: String,
  email: String,
  isVolunteer: Boolean,
  thumbsUp: Number,
  thumbsDown: Number,
  photo: String,
  tasks: [],
})

const tasksSchema = new Schema({
  volunteer_id: String,
  volunteer_name: String,
  volunteer_photo: String,
  volunteer_thumbsUp: Number,
  volunteer_thumbsDown: Number,
  requestor_id: String,
  requestor_name: String,
  requestor_photo: String,
  requestor_thumbsUp: Number,
  requestor_thumbsDown: Number,
  task_date: String,
  task_status: String, // Pending, Accepted, Completed
  task_body: String,
  task_neighborhood: String,
  start_time: String,
  end_time: String,
  duration: Number,
  room_id: String
})

const Users = mongoose.model('Users', usersSchema);
const Tasks = mongoose.model('Tasks', tasksSchema);

module.exports = {
  Users,
  Tasks,
}