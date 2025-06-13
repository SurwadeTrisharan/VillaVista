import React, { useState } from 'react';

const ContactForm = () => {
  <title>VillaVista-ContactUs</title>
  const [formData, setFormData] = useState({
    name: '', email: '', subject: '', message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert("Thank you for your message!");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="contact-card">
        <h2>Get in Touch</h2>
        <p>We’d love to hear from you. Send us a message using the form below.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
