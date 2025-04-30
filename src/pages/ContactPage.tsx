import { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import FlowerPetals from '../components/FlowerPetals';
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    
    // Phone validation (optional but if provided, must be valid)
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
      valid = false;
    }
    
    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully",
        description: "Thank you for reaching out. We will get back to you soon.",
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const newBg = "https://file.pngbackground.com/uploads/preview/ayodhya-ram-mandir-poster-background-hd-editing-images-cb-pic-5zvprcl.webp";

  return (
    <div className="page-transition pb-12 pt-16">
      <FlowerPetals />
      
      <PageBanner 
        title="Contact Us" 
        subtitle="Get in Touch with Ayodhya Blessings" 
        backgroundImage={newBg}
      />
      
      <div className="container mx-auto px-4">
        {/* Introduction */}
        <section className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold text-ayodhya-maroon mb-6">We'd Love to Hear From You</h2>
          <p className="text-lg">
            Have questions about visiting Ayodhya? Need assistance planning your pilgrimage? Or simply want to share your experience?
            Fill out the form below or use our contact information to reach out to us.
          </p>
        </section>
        
        {/* Contact Form and Information */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-ayodhya-maroon mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ayodhya-saffron ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your full name"
                  />
                  {formErrors.name && <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ayodhya-saffron ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your email address"
                  />
                  {formErrors.email && <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ayodhya-saffron ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your phone number"
                  />
                  {formErrors.phone && <p className="mt-1 text-red-500 text-sm">{formErrors.phone}</p>}
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ayodhya-saffron"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Trip Planning">Trip Planning</option>
                    <option value="Accommodations">Accommodations</option>
                    <option value="Temple Information">Temple Information</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ayodhya-saffron ${formErrors.message ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Your message"
                  ></textarea>
                  {formErrors.message && <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-ayodhya-saffron hover:bg-ayodhya-orange text-white py-3 rounded-md transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-ayodhya-maroon mb-6">Contact Information</h3>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-bold text-ayodhya-maroon mb-3">Ayodhya Office</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ayodhya-saffron mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Near Ram Mandir Complex, Ram Path, Ayodhya, Uttar Pradesh, India - 224123</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ayodhya-saffron mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>+91 1234567890</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ayodhya-saffron mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>info@ayodhyablessings.com</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg font-bold text-ayodhya-maroon mb-3">Office Hours</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-lg font-bold text-ayodhya-maroon mb-3">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-ayodhya-maroon hover:text-ayodhya-saffron transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-ayodhya-maroon hover:text-ayodhya-saffron transition-colors">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-ayodhya-maroon mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-ayodhya-maroon mb-2">What are the best times to visit Ayodhya?</h3>
              <p>
                The most comfortable time to visit Ayodhya is from October to March when the weather is pleasant. However, if you wish to experience the festivals, plan your visit during Ram Navami (March-April) or Diwali (October-November).
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-ayodhya-maroon mb-2">How can I book a guided tour of Ayodhya?</h3>
              <p>
                You can book guided tours through our website or by contacting us directly via phone or email. We offer various tour packages ranging from half-day temple tours to comprehensive multi-day pilgrimages.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-ayodhya-maroon mb-2">Are there any dress codes for visiting temples in Ayodhya?</h3>
              <p>
                Yes, modest attire is recommended for temple visits. Men should wear shirts/t-shirts with pants or dhotis, while women should wear salwar kameez, sarees, or other modest clothing that covers shoulders and knees. Some temples may require head coverings for women.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-ayodhya-maroon mb-2">How far is the nearest airport from Ayodhya?</h3>
              <p>
                Maharishi Valmiki International Airport in Ayodhya is now operational and is approximately 8 km from the city center. Alternatively, Lucknow Airport is about 135 km (2.5-3 hours drive) from Ayodhya.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
