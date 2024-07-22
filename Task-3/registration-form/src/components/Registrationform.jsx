
import React, { useState } from 'react';
import '../css/RegistrationForm.css';

const Registrationform = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validate = () => {
        let errors = {};
        const { username, email, password, confirmPassword } = formData;

        if (!username) errors.username = "Username is required.";
        if (!email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email address is invalid.";
        }
        if (!password) errors.password = "Password is required.";
        if (password.length < 6) errors.password = "Password must be at least 6 characters.";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            console.log('Form data submitted:', formData);
        
            setSuccessMessage('Registration Successful!');
            setErrors({}); 
            setFormData({
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            }); 
        } else {
            setErrors(formErrors);
            setSuccessMessage(''); 
        }
    };

    return (
        <div>
            <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="error">{errors.username}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>

                <button type="submit">Register</button>
            </form>
            {successMessage && <p className="success">{successMessage}</p>}
        </div>
    );
};

export default Registrationform;
