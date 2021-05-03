const {Users, Tasks, Messages} = require('./index.js');

Users.insertMany([
  {
    firebase_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    first_name: "Sharon",
    last_name: "Rollins",
    neighborhood: 'hollywood',
    phone_number: '9999999999',
    email: 'sbaek@gmail.com',
    isVolunteer: false,
    thumbsUp: 5,
    thumbsDown: 2,
    photo: 'https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg',
  },
  {
    firebase_id: '2',
    first_name: "Meredith",
    last_name: "Roberts",
    neighborhood: 'Santa Monica',
    phone_number: '111',
    email: 'old@gmail.com',
    isVolunteer: false,
    thumbsUp: 1,
    thumbsDown: 0,
    photo: 'www.photo.com',
  }
])
.then(() => {
  console.log('Users inserted');
})
.catch((error) => {
  console.log(error);
})

Tasks.insertMany([
  {
    volunteer_id: "",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "walk my dog",
    task_neighborhood: "hollywood",
    start_time: "08:00",
    end_time: "08:30",
    duration: 30
  },
  {
    volunteer_id: "",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "fold laundry",
    task_neighborhood: "hollywood",
    start_time: "08:30",
    end_time: "09:30",
    duration: 60
  },
  {
    volunteer_id: "",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "clean the kitchen",
    task_neighborhood: "hollywood",
    start_time: "10:00",
    end_time: "11:30",
    duration: 90
  },
  {
    volunteer_id: "",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "grocery shopping",
    task_neighborhood: "hollywood",
    start_time: "12:00",
    end_time: "13:30",
    duration: 90
  },
  {
    volunteer_id: "",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "re-pot plants",
    task_neighborhood: "hollywood",
    start_time: "13:00",
    end_time: "14:30",
    duration: 90
  },
  {
    volunteer_id: "sKfzL9j8MeUNbZAbH4wsbGA63QK2",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "walk my dog",
    task_neighborhood: "hollywood",
    start_time: "08:00",
    end_time: "08:30",
    duration: 30
  },
  {
    volunteer_id: "",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "water plants",
    task_neighborhood: "hollywood",
    start_time: "14:00",
    end_time: "14:30",
    duration: 30
  },
  {
    volunteer_id: "",
    requestor_id: 'CKnBFCC2y1OCfw2UZccT0X8fF8L2',
    requestor_name: 'sharon rollins',
    requestor_photo: "https://www.southernfoodways.org/wp-content/uploads/sharonrollins-2.jpg",
    task_date: "2021-04-06T03:26:27.729Z",
    task_status: "Pending",
    task_body: "read",
    task_neighborhood: "hollywood",
    start_time: "15:00",
    end_time: "15:30",
    duration: 30
  },
])
.then(() => {
  console.log('Tasks inserted');
})
.catch((error) => {
  console.log(error);
})