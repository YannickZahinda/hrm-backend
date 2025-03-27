import React from 'react';
import { LinkedinIcon, GithubIcon, MailIcon } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-2 px-2 fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-1 md:mb-0">
          <p className="text-xs">
            © {currentYear} Yannick Zahinda Mulikuza. All Rights Reserved.
          </p>
          <p className="text-[10px] text-gray-400 mt-0">
            Software Developer
          </p>
        </div>
        
        <div className="flex space-x-2">
          <a 
            href="https://www.linkedin.com/in/yannickmulikuza"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a 
            href="https://github.com/yannickzahinda"
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a 
            href="mailto:ymulikuza@gmail.com"
            className="hover:text-green-500 transition-colors"
            aria-label="Email"
          >
            <MailIcon size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;