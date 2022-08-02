import { useState } from "react";
import { doc, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';

import FormInput from "../../components/form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../../components/button/button.component";
import { db } from "../../utils/firebase/firebase.utils";
import { selectCurrentUser } from "../../store/user/user.selector";


import './contact.styles.scss'

const defaultFormFields = {
    name: '',
    email: '',
    message: '',
};

const Contact = () => {
    const currentUser = useSelector(selectCurrentUser);

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, email, message } = formFields;

    const handleSubmit = async (e) => {
        e.preventDefault();

        await setDoc(doc(db, "contacts", email), {
            name: name,
            email: email,
            message: message
        });

        alert("Message has been submitted");

        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    };

    return (
        <div className="contact-container">
            <h2 className="contact-header">Have any questions?</h2>
            <form className="form" onSubmit={handleSubmit}>

                <FormInput 
                    label="Name"
                    type="text"
                    required
                    onChange={handleChange}
                    name='name'
                    value={name}
                />

                <FormInput 
                    label="Email"
                    type='email' 
                    required 
                    onChange={handleChange} 
                    name='email'
                    value={email} 
                /> 

                <FormInput 
                    label="Message"
                    type='textarea' 
                    required 
                    onChange={handleChange} 
                    name='message'
                    value={message} 
                />

                <Button type="submit">Submit</Button>
            </form>
        </div>
        
    );
};

export default Contact;