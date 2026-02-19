
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-zinc-900 p-8 rounded-lg shadow-lg">
        {/* Header */}
        <h2 className="font-bold text-2xl mb-4 text-center">Contact Us</h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          Last updated on <span className="font-semibold">19-02-2026 12:45:52</span>
        </p>

        {/* Company Info */}
        <div className="text-gray-300 space-y-4">
          <p>
            <span className="font-semibold">Merchant Legal Entity Name:</span> KONNEX
          </p>

          {/* Address Section */}
          <div className="flex items-start gap-2">
            <MapPin className="text-gray-400 w-5 h-5 mt-1" />
            <p>
              <span className="font-semibold">Registered Address:</span> <br />
              Sudha Shankar Innovation Hub, IIT Madras, Chennai, Tamil Nadu - 600036
            </p>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="text-gray-400 w-5 h-5 mt-1" />
            <p>
              <span className="font-semibold">Operational Address:</span> <br />
              Sudha Shankar Innovation Hub, IIT Madras, Chennai, Tamil Nadu - 600036
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex items-center gap-2">
            <Phone className="text-gray-400 w-5 h-5" />
            <p>
              <span className="font-semibold">Telephone No:</span> 9263704199 , 8955091204 
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="text-gray-400 w-5 h-5" />
            <p>
              <span className="font-semibold">E-Mail ID:</span>{" "}
              <a href="mailto:abc@gmail.com" className="text-blue-400 hover:underline">
              contact.konnexteam@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

