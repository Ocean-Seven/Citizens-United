const dbHelpers = require('../database/dbHelpers.js');

const controller = {
  getUserInfo: (req, res) => {
    dbHelpers.getUserInfo(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getVolunteerInfo: (req, res) => {
    dbHelpers.getVolunteerInfo(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getRequesterInfo: (req, res) => {
    dbHelpers.getRequesterInfo(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  postSignUp: (req, res) => {
    dbHelpers.postSignUp(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send('Signed up a new user');
      }
    })
  },

  getAllTasks: (req, res) => {
    dbHelpers.getAllTasks(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getOneTask: (req, res) => {
    dbHelpers.getOneTask(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  putRoom: (req, res) => {
    dbHelpers.putRoom(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  postNewTask: (req, res) => {
    dbHelpers.postNewTask(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  acceptTask: (req, res) => {
    dbHelpers.acceptTask(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  hideTask: (req, res) => {
    dbHelpers.hideTask(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  completeTask: (req, res) => {
    dbHelpers.completeTask(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  expireTask: (req, res) => {
    dbHelpers.expireTask(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  deleteTask: (req, res) => {
    dbHelpers.deleteTask(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  thumbsUp: (req, res) => {
    dbHelpers.thumbsUp(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  thumbsDown: (req, res) => {
    dbHelpers.thumbsDown(req, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    })
  },

  getOldTasks: (req, res) => {
    dbHelpers.getOldTasks(req, (err, data) => {
      if (err) res.status(400).send(err);
      res.status(200).send(data);
    });
  },
}

module.exports = controller;