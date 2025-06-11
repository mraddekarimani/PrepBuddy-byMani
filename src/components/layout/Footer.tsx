import React from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Me</h3>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
              <textarea
                placeholder="Your message"
                rows={3}
                className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Placement Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-violet-600 dark:text-violet-400 hover:underline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  LeetCode
                </a>
              </li>
              <li>
                <a href="https://www.geeksforgeeks.org" target="_blank" rel="noopener noreferrer" className="flex items-center text-violet-600 dark:text-violet-400 hover:underline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  GeeksForGeeks
                </a>
              </li>
              <li>
                <a href="https://www.hackerrank.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-violet-600 dark:text-violet-400 hover:underline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  HackerRank
                </a>
              </li>
              <li>
                <a href="https://www.codechef.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-violet-600 dark:text-violet-400 hover:underline">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  CodeChef
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links & Copyright */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <a href="mailto:your.email@example.com" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} PrepBuddy by Mani. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;