import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import './AddUser.Module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import { Link, useNavigate } from 'react-router-dom';
import Users from '../UI/Users';

const EditUser = props => {

    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [id, setId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    var index = Users.map(function (user) {
        return user.id;
    }).indexOf(id);

    useEffect(() => {
        setUsername(localStorage.getItem('Name'));
        setAge(localStorage.getItem('Age'));
        setId(localStorage.getItem('Id'));
    }, []);

    const EditUserHandler = (event) => {
        event.preventDefault();
        if (username.trim().length === 0 || age.length === 0) {
            setError({
                title: 'invalid input',
                message: 'Please enter valid name and age'
            });
            return;
        }
        if (+age < 1) {
            setError({
                title: 'invalid age',
                message: 'Please enter valid age > 0'
            });
            return;
        }
        let updated_user = Users[index];
        updated_user.Name = username;
        updated_user.Age = age;
        navigate("/");
    }
    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }
    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    }
    const errorHandler = () => {
        setError(null);
    }
    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card cssClass="input">
                <form onSubmit={EditUserHandler}>
                    <label htmlFor="username">Uername</label>
                    <input id="username" type="text" value={username} onChange={usernameChangeHandler}></input>
                    <label htmlFor="age">Age</label>
                    <input id="age" type="text" value={age} onChange={ageChangeHandler}></input>
                    <Button type="submit">Update user</Button>
                </form>
                <Link to="/">UsersList</Link>
            </Card>

        </div>
    );
};

export default EditUser;