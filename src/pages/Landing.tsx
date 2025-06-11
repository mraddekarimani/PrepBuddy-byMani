import React from 'react';
import scenicVideo from '../assets/video.mp4';
import scenicFallback from '../assets/fallback.jpg';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Target,
  Calendar,
  Award,
  BarChart2,
  Users,
  CheckCircle,
  Github,
  Code2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Landing: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Target className="h-6 w-6 text-indigo-300" />,
      title: "100-Day Challenge",
      description: "Structured preparation plan covering DSA, aptitude, and interview prep"
    },
    {
      icon: <Calendar className="h-6 w-6 text-green-300" />,
      title: "Daily Progress Tracking",
      description: "Monitor your daily tasks and maintain consistency"
    },
    {
      icon: <Award className="h-6 w-6 text-amber-300" />,
      title: "Streak System",
      description: "Build momentum with daily completion streaks"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-purple-300" />,
      title: "Progress Analytics",
      description: "Visual insights into your preparation journey"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-300" />,
      title: "Mock Interviews",
      description: "Practice with AI and peer interview simulations"
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-rose-300" />,
      title: "Organized Categories",
      description: "Structured learning paths for different topics"
    }
  ];

  const codingProfiles = [
    {
      icon: <Code2 />,
      name: "GeeksforGeeks",
      link: "https://www.geeksforgeeks.org/user/addekarimcov2/",
      color: "text-green-200 hover:text-green-300"
    },
    {
      icon: <Github />,
      name: "LeetCode",
      link: "https://leetcode.com/u/Manikanta11/",
      color: "text-yellow-200 hover:text-yellow-300"
    },
    {
      icon: <Code2 />,
      name: "CodeChef",
      link: "https://www.codechef.com/users/addekarimani",
      color: "text-purple-200 hover:text-purple-300"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hidden sm:block absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      >
        <source src={scenicVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback Image for Mobile */}
      <img
        src={scenicFallback}
        alt="Scenic background"
        className="sm:hidden absolute top-0 left-0 w-full h-full object-cover z-[-2]"
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center mb-6"
        >
          <BookOpen className="h-12 w-12 text-indigo-500" />
          <h1 className="ml-3 text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            PrepBuddy<span className="ml-2 text-indigo-500 text-2xl sm:text-3xl font-semibold">
    by Mani
  </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-md mx-auto text-xl text-white sm:text-2xl md:max-w-3xl"
        >
          Your ultimate companion for placement preparation. Track progress, maintain consistency, and achieve your career goals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 flex justify-center gap-4"
        >
          <a
            href="/auth?mode=signup"
            className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-indigo-500 border border-white hover:bg-indigo-500/10 transition duration-300"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <a
            href="/auth?mode=signin"
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-indigo-500 hover:bg-indigo-500/10 transition duration-300"
          >
            Sign In
          </a>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-white mb-12">
          Everything you need to crack placements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg transition-shadow duration-300 text-white border border-white/20 hover:bg-white/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-1">
                {feature.title}
              </h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Coding Profiles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <h2 className="text-3xl font-extrabold text-center text-white mb-12">
          Practice Platforms
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {codingProfiles.map((profile, index) => (
            <motion.a
              key={index}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center justify-center p-6 rounded-lg transition-all duration-300 text-white border border-white/20 ${profile.color}`}
            >
              {profile.icon}
              <span className="ml-2 font-semibold">{profile.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Landing;
