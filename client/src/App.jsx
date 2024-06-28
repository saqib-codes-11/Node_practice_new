/**
 * App component
 *
 * Primary component for the application.
 * Topics involved:
 * - React hooks
 * - Custom hooks
 * - Fetching data from the server
 * - Error handling
 * - Conditional rendering
 * - Passing props
 * - State management
 *
 * React hooks:
 * - useState
 * - useEffect
 *
 * Custom hooks:
 * - useHttp
 */
import { useState, useEffect } from "react";
import Users from "./components/Users.jsx";
import CreateUser from "./components/CreateUser.jsx";
import useHttp from "./hooks/use-http";
import "./App.css";

const serverPort = 1337;
const serverHost = "localhost";

const serverUrl = "http://" + serverHost + ":" + serverPort;

/** App Component function */
export default function App() {
  const [users, setUsers] = useState([]);
  const { isLoading, error, sendRequest: fetchUsers } = useHttp();

  /**
   * Sets the users state
   * @param {array} data - Array of user objects
   * @returns {void}
   */
  const handleSetUsers = (data) => {
    data.sort((a, b) => {
      return a.id - b.id;
    });

    setUsers(data);
  };

  /**
   * Updates the users state
   * @param {array} data - Array of user objects
   * @returns {void}
   */
  const handleUpdateUsers = (data) => {
    fetchUsers({ url: serverUrl + "/api/users" }, handleSetUsers);
  };

  /**
   * Fetches users from the server. Runs on component mount,
   * and whenever the fetchUsers function is called.
   */
  useEffect(() => {
    fetchUsers({ url: serverUrl + "/api/users" }, handleSetUsers);
  }, [fetchUsers]);

  /**
   * Adds a user to the database via Node API.
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {void}
   */
  function addUser(name, email, password) {
    const config = {
      url: serverUrl + "/api/users",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };

    fetchUsers(config, handleUpdateUsers);
  }

  /**
   * Updates a user in the database via Node API.
   * @param {number} id - User ID
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {void}
   */
  function updateUser(id, name, email, password) {
    const config = {
      url: serverUrl + "/api/users/" + id,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };

    console.log(config.body);

    fetchUsers(config, handleUpdateUsers);
  }

  /**
   * Deletes a user from the database via Node API.
   * @param {number} id - User ID
   * @returns {void}
   */
  function deleteUser(id) {
    const config = {
      url: serverUrl + "/api/users/" + id,
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    fetchUsers(config, handleUpdateUsers);
  }

  /** Renders the component in JSX. */
  return (
    <div className="container main-content">
      <h1>User Management Example</h1>
      <code>Hello from React😎</code>
      {/* Conditionally render Loading and/or error text. */}
      {isLoading && <p>Loading...</p>}
      {error && <p>Server error: {error}</p>}
      <div className="users">
        <div className="create-user">
          <h3>Create New User</h3>
          {/* Insert CreateUser and Users components, pass state and functions as props. */}
          <CreateUser addUser={addUser} />
        </div>
        <div className="users-list">
          {users.length > 0 && <h3>View, Update, or Delete Users</h3>}
          <Users
            users={users}
            apiError={error}
            onUpdateUser={updateUser}
            onDeleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  );
}
