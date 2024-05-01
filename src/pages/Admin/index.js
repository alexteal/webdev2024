import { useState, useEffect } from "react";
import Header from "../../components/Header";
import "./index.css";
export default function Admin() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data.users); // Set users to data.users instead of data
      })
      .catch((error) =>
        console.error(`There was an error retrieving the user list: ${error}`),
      );
  }, []);
  function deleteUser(event) {
    event.preventDefault();
    fetch(`/api/users/${username}`, { method: "DELETE" })
      .then(() => {
        setUsers(users.filter((user) => user.username !== username));
        setUsername("");
      })
      .catch((error) =>
        console.error(`There was an error deleting the user: ${error}`),
      );
  }
  return (
    <>
      <Header />
      <div className="admin-container">
        <h1>Admin Page</h1>
        <ul>
          {users.map((user) => (
            <li key={user._id}>{user.username}</li>
          ))}
        </ul>
        <form onSubmit={deleteUser}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button type="submit">Delete User</button>
        </form>
      </div>
    </>
  );
}
