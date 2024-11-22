import React, { useState, useEffect } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AdminDash = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    role: "customer",
  });
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post("/users", newUser);
      toast.success("User added successfully!");
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setShowAddUserModal(false);
    } catch (error) {
      toast.error("Failed to add user.");
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await axios.put(`/users/${currentUser.user_id}`, currentUser);
      toast.success("User updated successfully!");
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === currentUser.user_id ? response.data : user
        )
      );
      setShowEditUserModal(false);
    } catch (error) {
      toast.error("Failed to update user.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      toast.success("User deleted successfully!");
      setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== userId));
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition duration-200"
          onClick={() => setShowAddUserModal(true)}
        >
          <FaPlus className="mr-2" />
          Add User
        </button>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={newUser.username}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              >
                <option value="customer">Customer</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowAddUserModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && currentUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Edit User</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={currentUser.username}
                onChange={handleEditInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={currentUser.email}
                onChange={handleEditInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={currentUser.role}
                onChange={handleEditInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-600"
              >
                <option value="customer">Customer</option>
                <option value="driver">Driver</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowEditUserModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Users..."
          className="p-2 border rounded-md mr-4 focus:ring-2 focus:ring-blue-600 w-full max-w-sm"
        />
        <FaSearch className="text-gray-500" />
      </div>

      {/* Users Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.user_id}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => {
                      setCurrentUser(user);
                      setShowEditUserModal(true);
                    }}
                    className="text-yellow-500 hover:text-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.user_id)}
                    className="text-red-500 hover:text-red-600 transition ml-4"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDash;
