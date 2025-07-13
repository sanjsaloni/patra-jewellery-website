// import React from 'react';
// import { MapPin, Phone } from 'lucide-react';

// const ContactSection: React.FC = () => {
//   return (
//     <section id="contact" className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center">
//           <h2 className="text-4xl font-bold text-gray-900 mb-12">Contact Us</h2>
          
//           <div className="space-y-6">
//             <div className="flex items-center justify-center space-x-3">
//               <MapPin className="h-6 w-6 text-yellow-600" />
//               <p className="text-xl text-gray-700">Bus stop, Jaraka, Dharmasala, Odisha 755050</p>
//             </div>
            
//             <div className="flex items-center justify-center space-x-3">
//               <Phone className="h-6 w-6 text-yellow-600" />
//               <p className="text-xl text-gray-700">+91 8249583565</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactSection;
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
const ContactSection: React.FC = () => {
  return (
    <section id='contact' className="py-20 bg-gradient-to-br from-amber-100 to-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h2>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <MapPin className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
              <p className="text-gray-600 leading-relaxed">
                Bus stop, Jaraka, Dharmasala, <br />
                Odisha 755050
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Phone className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600">+91 8249583565</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-4">
                <Mail className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">sp97172@gmail.com</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Visit our showroom to experience the beauty of our collection in person, or contact us for personalized assistance.
            </p>
            {/* <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-yellow-700 transform hover:-translate-y-1 transition-all duration-300">
              Schedule a Visit
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;