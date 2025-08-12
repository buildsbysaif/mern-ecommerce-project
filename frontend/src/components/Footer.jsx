import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12">
      <div className="container mx-auto px-4">
        {/* Feature Icons Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-b border-gray-700 pb-8">
            <div><i className="fas fa-box-open text-3xl mb-2 text-indigo-400"></i><p>Everyday fresh products</p></div>
            <div><i className="fas fa-shipping-fast text-3xl mb-2 text-indigo-400"></i><p>Free delivery over Rs 500/-</p></div>
            <div><i className="fas fa-percent text-3xl mb-2 text-indigo-400"></i><p>Daily Mega Discounts</p></div>
            <div><i className="fas fa-award text-3xl mb-2 text-indigo-400"></i><p>Best price on the market</p></div>
        </div>

        {/* Links and Socials Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
            <div>
                <h3 className="font-bold mb-4">ABOUT US</h3>
                <p className="text-gray-400">E-Commerce Pro is your one-stop shop for the best products online.</p>
                <div className="flex space-x-4 mt-4">
                    <a href="#" className="hover:text-indigo-400"><FaFacebook size={20}/></a>
                    <a href="#" className="hover:text-indigo-400"><FaTwitter size={20}/></a>
                    <a href="#" className="hover:text-indigo-400"><FaInstagram size={20}/></a>
                </div>
            </div>
            <div>
                <h3 className="font-bold mb-4">CATEGORIES</h3>
                <ul>
                    <li className="mb-2"><a href="/category/fashion" className="text-gray-400 hover:text-white">Fashion</a></li>
                    <li className="mb-2"><a href="/category/electronics" className="text-gray-400 hover:text-white">Electronics</a></li>
                    <li className="mb-2"><a href="/category/groceries" className="text-gray-400 hover:text-white">Groceries</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-4">USEFUL LINKS</h3>
                <ul>
                    <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                    <li className="mb-2"><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                    <li className="mb-2"><a href="mailto:support@ecommercepro.com" className="text-gray-400 hover:text-white">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-4">NEWSLETTER</h3>
                <p className="text-gray-400 mb-2">Subscribe for updates and promotions.</p>
                <form className="flex">
                    <input type="email" placeholder="Your Email" className="p-2 rounded-l-md text-black w-full" />
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-r-md">Subscribe</button>
                </form>
            </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center py-4 border-t border-gray-700">
            <p>Copyright {new Date().getFullYear()}. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;