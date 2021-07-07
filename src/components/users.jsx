import React from "react";
import Spinner from "react-spinkit";

const Users = ({ users }) => {
  return (
    <div className="users">
      {users.length !== 0 ? (
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
      ) : (
        <div className="spinner">
          <Spinner
            name="ball-spin-fade-loader"
            color="steelblue"
            className="spinner"
          />
        </div>
      )}
    </div>
  );
};

export default Users;
