/**
 * Users Component.
 * @param {array} props.users - Array of user objects
 * @param {function} props.onDeleteUser - Function to delete a user
 * @param {function} props.onUpdateUser - Function to update a user
 *
 * Renders a list of users, and dynamically displays a form to update
 * user fields if the user is selected for update. Also display a delete
 * button for each user.
 *
 * Topics involved:
 * - React hooks
 * - Conditional rendering
 * - Accessing props using js destructuring
 * - Passing props to standard html elements
 * - State management
 * - Form handling via state
 */
import React, { useState } from "react";

export default function Users({ users, onDeleteUser, onUpdateUser }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [enteredValues, setEnteredValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  /**
   * Mark the user as selected for update, and
   * populate the form with the user's data.
   *
   * @param {object} user - User object
   */
  function updateSelectedUser(user) {
    setSelectedUser(user.id);

    setEnteredValues({
      name: user.name,
      email: user.email,
      password: user.password,
    });
  }

  /**
   * Is called when a form input changes.
   * Updates the enteredValues state with the form data.
   *
   * @param {object} event - Event object (passed by browser)
   */
  function inputChangeHandler(event) {
    setEnteredValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }

  /**
   * Called when the form is submitted.
   * Calls the onUpdateUser function, and resets the form
   * by setting the enteredValues state to empty strings and
   * the selectedUser state to null.
   *
   * @param {object} event - Event object (passed by browser)
   */
  function submitHandler(event) {
    /** Prevent page from reloading */
    event.preventDefault();

    /** ...then update state */
    onUpdateUser(selectedUser, enteredValues.name, enteredValues.email, enteredValues.password);
    setSelectedUser(null);
    setEnteredValues({
      name: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="users-component">
      <ul className="list-group">
        {users.map((user) => (
          <li key={user.id} className="list-group-item">
            {/* If the user is selected for edit */}
            {selectedUser === user.id && (
              <form onSubmit={submitHandler}>
                <div className="row">
                  <div className="col">
                    <input
                      type="text"
                      placeholder="name"
                      name="name"
                      value={enteredValues.name}
                      onChange={inputChangeHandler}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      placeholder="email"
                      name="email"
                      value={enteredValues.email}
                      onChange={inputChangeHandler}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      placeholder="password"
                      name="password"
                      value={enteredValues.password}
                      onChange={inputChangeHandler}
                      className="form-control"
                    />
                  </div>

                  <button type="submit" className="col-2 btn btn-success">
                    Save
                  </button>
                </div>
              </form>
            )}
            {/* If the user is not selected for edit */}
            {selectedUser !== user.id && (
              <div>
                {user.name} - {user.email} - {user.password}
                <div className="list-item-actions">
                  <button
                    onClick={(e) => updateSelectedUser(user)}
                    type="button"
                    className="btn btn-primary">
                    Update
                  </button>
                  <button
                    onClick={(e) => onDeleteUser(user.id)}
                    type="button"
                    className="btn btn-danger">
                    Delete
                  </button>{" "}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
