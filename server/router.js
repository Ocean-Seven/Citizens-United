const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/users')
  .get(controller.getUserInfo)
  .post(controller.postSignUp)

router
  .route('/tasks')
  .post(controller.postNewTask)
  .delete(controller.deleteTask)

router
  .route('/oldtasks')
  .get(controller.getOldTasks)

router
  .route('/oneTask')
  .get(controller.getOneTask)

router
  .route('/rooms')
  .put(controller.putRoom)

router
  .route('/tasks/volunteer')
  .get(controller.getVolunteerInfo)

router
  .route('/tasks/requester')
  .get(controller.getRequesterInfo)

router
  .route('/tasks/accepted')
  .put(controller.acceptTask)

router
  .route('/tasks/hidden')
  .put(controller.hideTask)

router
  .route('/tasks/completed')
  .put(controller.completeTask)

router
  .route('/tasksexpired')
  .put(controller.expireTask)

router
  .route('/ratings/thumbsUp')
  .put(controller.thumbsUp)

router
  .route('/ratings/thumbsDown')
  .put(controller.thumbsDown)

module.exports = router
