import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from 'axios';

const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null); // hCaptcha token
  const [captchaVerified, setCaptchaVerified] = useState(false); // Verify captcha status

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaVerified) {
      alert('Please complete the hCaptcha verification.');
      return;
    }

    const formData = {
      name,
      contact,
      email,
      message,
      token, // hCaptcha token sent to the server
    };

    axios.post('http://gsa.nuviontech.com:8000/api/contact-us/', formData)
      .then(response => {
        console.log("Form submitted successfully:", response.data);
        // Handle success (e.g., show a success message)
      })
      .catch(error => {
        console.error("Error submitting form:", error);
        // Handle error (e.g., show an error message)
      });
  };

  const handleCaptchaVerification = (token: string) => {
    setToken(token);
    setCaptchaVerified(true);
  };

  return (
    <section
      className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat p-8"
      style={{ backgroundImage: `url('/bg2.png')` }}
    >
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-xl border border-gray-200 border-2 p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-oswald font-bold text-blue-600 mb-6">CONTACT US</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-poppins font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-md p-3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="contact" className="text-lg font-poppins font-semibold text-gray-700 mb-2">Contact Number</label>
            <input
              type="text"
              id="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter your contact number"
              className="border border-gray-300 rounded-md p-3"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-poppins font-semibold text-gray-700 mb-2">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email id"
              className="border border-gray-300 rounded-md p-3"
            />
          </div>
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="message" className="text-lg font-poppins font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={5}
              className="border border-gray-300 rounded-md p-3 resize-none"
            />
          </div>

          {/* hCaptcha */}
          <div className="md:col-span-2">
            <HCaptcha
              sitekey="0c5428a0-f780-455c-af54-5298b6eedfd2" // Replace with your site key
              onVerify={handleCaptchaVerification}
            />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-8 py-3 rounded-full"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;