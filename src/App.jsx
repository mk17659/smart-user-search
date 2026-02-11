import { useState } from "react";
import { USERS } from "./data";
import { useFilteredUsers } from "./useFilteredUsers";

function App() {
  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredUsers = useFilteredUsers(users, search, role, status);

  const toggleStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  return (
    <div className="container">
      <h1>Smart User Search</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Filters */}
      <div className="filters">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>All</option>
          <option>Admin</option>
          <option>User</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Derived Info */}
      <p>
        Showing {filteredUsers.length} of {users.length} users
      </p>

      {/* User List */}
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id} className="user">
            <span>
              <strong>{user.name}</strong> — {user.role} —{" "}
              {user.active ? "Active" : "Inactive"}
            </span>
            <button onClick={() => toggleStatus(user.id)}>
              {user.active ? "Deactivate" : "Activate"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
