import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-10 py-16">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Get in Touch</h1>

      <div className="w-full max-w-xl bg-gray-800 p-5 sm:p-8 rounded-2xl shadow-lg">
        <form className="space-y-5 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Name</label>
            <input
              type="text"
              className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white">Message</label>
            <textarea
              className="w-full p-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="5"
              placeholder="Your message..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white py-3 rounded-xl font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
