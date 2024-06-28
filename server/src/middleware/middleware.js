/**
 * @fileoverview Middleware for the api routes.
 *
 * Middleware is a function that has access to the request and response object.
 * It can execute any code, make changes to the request and response objects,
 * end the request-response cycle, and call the next middleware in the stack.
 *
 * It's most commonly used for data validation and authentication.
 */

module.exports = {
  /**
   * @apiDescription Middleware to log a message to the console.
   */
  async logMessage(req, res, next) {
    console.log("Middleware is working!");
    next();
  },
};
