/**
 * Create user component.
 * @param {object} props.addUser - Add user function
 *
 * This component is responsible for creating new users. It
 * renders a form, then passes the form data to the addUser
 * function. This function is passed in from the App component.
 *
 * Topics involved:
 * - React refs
 * - Form handling via refs
 * - Passing props
 *
 * Refs vs State:
 * - Refs are used to access DOM nodes directly
 * - Refs do not cause a re-render when changed
 * - State is mainly used with objects and primitive types
 * - State causes re-renders when changed
 */
import { useRef } from "react";

export default function CreateUser(props) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function resetForm() {
    nameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
  }

  function submitHandler(event) {
    event.preventDefault();
    const name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    props.addUser(name, email, password);

    resetForm();
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="row g-3">
        <div className="form-group col">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input type="text" placeholder="John Doe" ref={nameInputRef} className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input type="text" placeholder="john@example.com" ref={emailInputRef} className="form-control" />
        </div>
        <div className="col">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            placeholder="SuperSecurePassword123!"
            ref={passwordInputRef}
            className="form-control"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success col-2">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
