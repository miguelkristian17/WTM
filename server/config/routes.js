const usersController = require("../controllers/user");
const eventsController = require("../controllers/event");
const commentsController = require("../controllers/comment");


module.exports = function(app){
    //users
    app.get("/api/users", usersController.viewUsers);
    app.post("/api/users/register", usersController.register);
    app.post("/api/users/login", usersController.login);
    app.delete("/api/users/logout", usersController.logout);
    app.delete("/api/users/:id", usersController.deleteUser);
    app.get("/api/users/current", usersController.viewLoggedUser);
    app.get("/api/users/:id", usersController.viewUser);
    app.put("/api/users/:id", usersController.editUser);
    //events
    app.get("/api/events", eventsController.viewEvents);
    app.delete("/api/events/:id", eventsController.testDelete);
    app.post("/api/users/:id/events", eventsController.createEvent);
    app.get("/api/events/:id", eventsController.viewEvent);
    app.delete("/api/events/:e_id/user/:u_id", eventsController.deleteEvent);
    app.put("/api/events/:e_id/user/:u_id", eventsController.attendEvent);
    //comments
    app.get("/api/comments", commentsController.viewComments);
    app.post("/api/comments/users/:u_id/events/:e_id", commentsController.createComment);
    app.delete("/api/comments/:c_id", commentsController.deleteComment);

}
