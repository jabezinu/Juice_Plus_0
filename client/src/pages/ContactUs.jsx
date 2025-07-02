import React from 'react'
import CommentSection from '../components/CommentSection';
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md';

const workingHours = [
  { day: 'Monday', hours: '8:30 AM – 7:30 PM' },
  { day: 'Tuesday', hours: '8:30 AM – 7:30 PM' },
  { day: 'Wednesday', hours: '8:30 AM – 7:30 PM' },
  { day: 'Thursday', hours: '8:30 AM – 7:30 PM' },
  { day: 'Friday', hours: '8:30 AM – 7:30 PM' },
  { day: 'Saturday', hours: '8:30 AM – 7:30 PM' },
  { day: 'Sunday', hours: '8:30 AM – 7:30 PM' },
];

const ContactUs = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-yellow-100 py-10">
      <div className="w-full max-w-5xl bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col gap-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-purple-700 mb-2 tracking-tight drop-shadow-lg">Contact Us</h1>
        <p className="text-center text-lg text-gray-700 mb-8">We'd love to hear from you! Reach out to us using the information below or leave a comment.</p>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-lg">
              <span className="bg-purple-100 p-2 rounded-full text-purple-600"><MdEmail size={24} /></span>
              <span className="font-semibold">Email:</span>
              <a href="mailto:contact@akakacoffee.com" className="text-purple-700 hover:underline font-medium">contact@akakacoffee.com</a>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <span className="bg-purple-100 p-2 rounded-full text-purple-600"><MdPhone size={24} /></span>
              <span className="font-semibold">Phone:</span>
              <a href="tel:+251903243174" className="text-purple-700 hover:underline font-medium">+251 903 243174</a>
            </div>
            <div className="flex items-center gap-4 text-lg">
              <span className="bg-purple-100 p-2 rounded-full text-purple-600"><MdLocationOn size={24} /></span>
              <span className="font-semibold">Location:</span>
              <span className="font-medium text-gray-800">Addis Ababa</span>
            </div>
            <div className="flex items-start gap-4 text-lg">
              <span className="bg-purple-100 p-2 rounded-full text-purple-600 mt-1"><MdAccessTime size={24} /></span>
              <div>
                <span className="font-semibold">Working Hours:</span>
                <ul className="mt-1 ml-2 flex flex-col gap-y-1 text-gray-700 text-base w-full min-w-[180px]">
                  {workingHours.map(({ day, hours }) => (
                    <li key={day} className="flex justify-between items-center pr-2">
                      <span className="font-medium">{day}:</span>
                      <span className="ml-2 whitespace-nowrap">{hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Map */}
          <div className="flex items-center justify-center">
            <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-purple-200 bg-white/70">
              <iframe
                title="location-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.5061911848766!2d38.79584867501893!3d9.023665991037442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85febe384a97%3A0xe4261d5ca58150c7!2sAkaka%20Coffee!5e1!3m2!1sen!2set!4v1751265774959!5m2!1sen!2set"
                className="w-full h-full border-0"
                style={{ minHeight: '100%', minWidth: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Comment Section */}
        <div className="mt-8 flex flex-col items-center gap-6">
          <a
            href="https://maps.app.goo.gl/yctmZKAvD1j97bcH8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold text-lg shadow-lg hover:scale-105 hover:from-purple-600 hover:to-pink-500 transition-transform duration-200 mb-4"
          >
            Leave a Review on Google Maps
          </a>
          <CommentSection />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
