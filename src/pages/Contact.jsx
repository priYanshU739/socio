import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact <span className="text-purple-500">Socia VR</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions, feedback, or partnership ideas?  
            We’d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <div className="space-y-8">
            
            <div className="flex items-start gap-4">
              <div className="bg-purple-600/20 p-3 rounded-xl">
                <Mail className="text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-gray-400">support@sociavr.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-600/20 p-3 rounded-xl">
                <Phone className="text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="text-gray-400">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-600/20 p-3 rounded-xl">
                <MapPin className="text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="text-gray-400">Chennai, India</p>
              </div>
            </div>

            {/* Decorative Glow Card */}
            <div className="mt-10 bg-linear-to-br from-purple-600/20 to-pink-600/10 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-md">
              <h3 className="text-xl font-semibold mb-2">
                Let’s Build the Future of Social VR 🚀
              </h3>
              <p className="text-gray-400 text-sm">
                Whether you're a creator, gamer, or brand — Socia VR is building 
                immersive experiences for the next generation.
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="bg-[#111118] p-8 rounded-2xl border border-gray-800 shadow-xl">
            <form className="space-y-6">
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-[#1a1a24] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[#1a1a24] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Write your message..."
                  className="w-full bg-[#1a1a24] border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition px-6 py-3 rounded-lg font-semibold"
              >
                Send Message <Send size={18} />
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
