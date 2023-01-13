import React from 'react';
import '../UI/ErrorModal.Module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const ErrorModal = (props) => {
    return (
        <div className="backdrop" onClick={props.onConfirm}>
            <Card cssClass="modal">
                <header className="header">
                    <h2>{props.title}</h2>
                </header>
                <div className="content">
                    <p>{props.message}</p>
                </div>
                <footer className="actions">
                    <Button onClick={props.onConfirm}>Okay</Button>
                </footer>
            </Card >
        </div >

    )
}
export default ErrorModal;