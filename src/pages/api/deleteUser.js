import { dbConnect } from "@/app/lib/db";
import User from "@/models/User";
function deleteUser(event) {
  event.preventDefault();
  fetch(`/api/users`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .then(() => {
      setUsers(users.filter((user) => user.username !== username));
      setUsername("");
    })
    .catch((error) =>
      console.error(`There was an error deleting the user: ${error}`),
    );
}
