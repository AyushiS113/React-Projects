import React, { useEffect } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import './UsersList.Module.css';
import { Link, useNavigate } from 'react-router-dom';
import Users from '../UI/Users';
const UsersList = (props) => {
    const navigate = useNavigate();

    const handelEdit = (id, name, age) => {
        localStorage.setItem("Id", id);
        localStorage.setItem("Name", name);
        localStorage.setItem("Age", age);
        navigate("/edit");
    }

    const handelDelete = (id) => {
        const index = Users.map(function (user) {
            return user.id;
        }).indexOf(id);
        Users.splice(index, 1);
        navigate("/");
    }

    useEffect(() => {
        console.log(Users);
    });

    return (
        <Card cssClass="users">
            <ul>
                {
                    Users && Users.length > 0
                        ?
                        Users.map(user =>
                        (
                            <li key={user.id}>{user.Name} {user.Age} years old <button type="submit" className="button" onClick={() => handelEdit(user.id, user.Name, user.Age)}>Edit</button>
                                <button type="submit" className="button" onClick={() => handelDelete(user.id)}>Delete</button></li>

                        )
                        )
                        : <p>No data found</p>
                }
            </ul>
            <Link to="/create"><Button type="submit">Create</Button></Link>
        </Card>

    );
}
export default UsersList;