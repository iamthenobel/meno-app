import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiImage, FiFileText, FiLock, FiShare2 } from 'react-icons/fi';

const LandingPage = () => {
  const features = [
    {
      icon: <FiFileText className="w-6 h-6" />,
      title: "Text Organization",
      description: "Easily save and categorize all your important notes and documents."
    },
    {
      icon: <FiImage className="w-6 h-6" />,
      title: "Image Storage",
      description: "Upload and organize your images with intuitive tagging system."
    },
    {
      icon: <FiLock className="w-6 h-6" />,
      title: "Secure Storage",
      description: "Your data is encrypted and protected with industry-standard security."
    },
    {
      icon: <FiShare2 className="w-6 h-6" />,
      title: "Easy Sharing",
      description: "Share your content with others in just a few clicks."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Meno</span>
        </motion.div>
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-gray-600 hover:text-blue-600 transition">
            Sign In
          </Link>
          <Link 
            to="/signup" 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
          >
            Get Started <FiArrowRight className="ml-2" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Organize Your <span className="text-blue-600">Thoughts</span> and <span className="text-blue-600">Memories</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Meno is your simple, secure space to save and organize texts and images — accessible anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center font-medium"
            >
              Start for Free
            </Link>
            <Link
              to="/features"
              className="px-8 py-4 bg-white text-gray-800 rounded-xl hover:bg-gray-100 transition shadow hover:shadow-md flex items-center justify-center font-medium"
            >
              Learn More
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 md:mt-24 rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto border border-gray-200"
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-64 md:h-96 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute top-8 left-8 w-32 h-32 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm"></div>
              <div className="absolute bottom-8 right-8 w-40 h-40 bg-white bg-opacity-30 rounded-xl backdrop-blur-sm"></div>
              <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h3 className="font-bold text-gray-800 mb-2">Your Content Here</h3>
                <p className="text-gray-600">Organized and accessible</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to organize your digital life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to organize your digital life?</h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of users who trust Meno with their important texts and images.
            </p>
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition shadow-lg hover:shadow-xl font-medium"
            >
              Get Started for Free
            </Link>
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4 text-blue-100">
              <div className="flex items-center">
                <FiCheckCircle className="mr-2" /> No credit card required
              </div>
              <div className="flex items-center">
                <FiCheckCircle className="mr-2" /> 14-day free trial
              </div>
              <div className="flex items-center">
                <FiCheckCircle className="mr-2" /> Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold text-white">Meno</span>
              </div>
              <p className="mb-4">Your simple, secure space for organization.</p>
              <p>© {new Date().getFullYear()} Meno. All rights reserved.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-white transition">Integrations</Link></li>
                <li><Link to="/updates" className="hover:text-white transition">Updates</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white transition">About</Link></li>
                <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition">Terms</Link></li>
                <li><Link to="/security" className="hover:text-white transition">Security</Link></li>
                <li><Link to="/cookies" className="hover:text-white transition">Cookies</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;