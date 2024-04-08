import React from 'react';
import Card from './Card';
import User from './User'; // Make sure the path is correct
import './UsersList.css';



const UsersList = (props) => {
    return (
    <Card className="users">
      <ul>
        {props.users.map((user) => (
          <User
            key={user.id}
            name={user.name}
            age={user.age}
            img={user.img}
            major={user.major}
          />
        ))}
      </ul>
    </Card>
    );
  };
  

export default UsersList;