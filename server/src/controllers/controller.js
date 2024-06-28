/**
 * @fileoverview Controller for the api routes.
 *
 * In the MVC pattern, the controller is responsible for handling the
 * logic of the application. It receives the request, processes it,
 * and returns the response.
 */

const User = require("../models/user.js");

module.exports = {
  /** 
   * @api {get} / 
   * @apiDescription Index Route
   */
  async index(req, res) {
    res.json({ message: "Hello from Node.js!" });
  },

  /** 
   * @api {post} /users 
   * @apiDescription Create a new user
   */
  async createUser(req, res) {
    const { name, email, password } = req.body;
    
    const user = {
      name: name,
      email: email,
      password: password,
    };

    User.create(user)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error creating user",
          error: err,
        });
      });
  },

  /** 
   * @api {get} /users 
   * @apiDescription Get all users
   */
  async getUsers(req, res) {
    User.findAll()
      .then((users) => {
        return res.json(users);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error getting users",
          error: err,
        });
      });
  },

  /** 
   * @api {get} /users/:id 
   * @apiDescription Get a user by id
   */
  async getUser(req, res) {
    const { id } = req.params;

    if (!id) return res.status(404).json({ message: "User not found" });

    User.findByPk(id)
      .then((user) => {
        return res.json(user);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error getting user",
          error: err,
        });
      });
  },

  /** 
   * @api {put} /users/:id 
   * @apiDescription Update a user by id
   */
  async updateUser(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "User not found" });

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const payload = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
      password: req.body.password || user.password,
    };

    User.update(payload, {
      where: { id: id },
    })
      .then((affectedCount) => {
        if (affectedCount > 0) {
          return res.json({ message: "User updated" });
        } else {
          return res.status(400).json({ message: "Error updating user" });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error updating user",
          error: err,
        });
      });
  },

  /** 
   * @api {delete} /users/:id 
   * @apiDescription Delete a user by id
   */
  async deleteUser(req, res) {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "User not found" });

    const user = await User.findByPk(id);

    if (!user) return res.status(400).json({ message: "User not found" });

    User.destroy({
      where: { id: id },
    }).then((affectedCount) => {
      if (affectedCount > 0) {
        return res.json({ message: "User deleted" });
      } else {
        return res.status(400).json({ message: "Error deleting user" });
      }
    });
  },
};
