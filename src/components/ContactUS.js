// src/components/ContactUs.js
import React, { useState } from 'react';
import './AuthPage.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email format.';
    }
    if (!formData.message.trim()) validationErrors.message = 'Message is required.';
    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSuccessMessage('Thank you for reaching out to us. We will respond soon!');
      setFormData({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>We'd love to hear from you. Please fill out the form below to get in touch with us.</p>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label htmlFor="email"></label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="message"></label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here"
        />
        {errors.message && <p className="error">{errors.message}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactUs;