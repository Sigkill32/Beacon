import React from "react";

const Users = ({ users }) => {
  return (
    <div className="users">
      <table>
        <caption>User Messages</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.sub}</td>
              <td>{user.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
