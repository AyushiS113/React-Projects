import React, { useState } from 'react';
import Card from '../UI/Card';
import './AddUser.Module.css';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import { useNavigate, Link } from 'react-router-dom';
import Users from '../UI/Users';
import { v4 as uuid } from "uuid";

const AddUser = props => {

    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const addUserHandler = (event) => {
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
        const ids = uuid();
        const id = ids.slice(0, 8);
        Users.push({ id: id, Name: username, Age: age });
        navigate('/');
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
                <form onSubmit={addUserHandler}>
                    <label htmlFor="username">Uername</label>
                    <input id="username" type="text" value={username} onChange={usernameChangeHandler}></input>
                    <label htmlFor="age">Age</label>
                    <input id="age" type="text" value={age} onChange={ageChangeHandler}></input>
                    <Button type="submit">Add user</Button>
                </form>
                <Link to="/" >UsersList</Link>
            </Card>

        </div>
    );
};

export default AddUser;