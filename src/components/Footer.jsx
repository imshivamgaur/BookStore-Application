import React from "react";
import {
  Mail,
  Phone,
  Github,
  Twitter,
  Linkedin,
  ShoppingBag,
  BookOpen,
  Home,
  MessageSquare,
  Code,
  Zap,
  MapPin,
  Clock,
} from "lucide-react";

const Footer = () => {
  // Data for links to make the JSX cleaner
  const navLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: BookOpen, label: "Cart", href: "/cart" },
    { icon: ShoppingBag, label: "Favorites", href: "/favorites" },
    { icon: MessageSquare, label: "Contact", href: "/contact" },
  ];

  const contactDetails = [
    {
      icon: Mail,
      label: "shivamgaur24august@gmail.com",
      href: "mailto:shivamgaur24august@gmail.com",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Phone,
      label: "+91-9667454815",
      href: "tel:+9667454815",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: MapPin,
      label: "Noida, India",
      href: "#",
      color: "text-red-600 dark:text-red-400",
    },
    {
      icon: Clock,
      label: "24/7 Support",
      href: "#",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/imshivamgaur24august",
      label: "GitHub",
      hoverColor: "hover:text-gray-700 dark:hover:text-gray-300",
    },
    {
      icon: Twitter,
      href: "https://twitter.com",
      label: "Twitter",
      hoverColor: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/iamshivamgaur24august",
      label: "LinkedIn",
      hoverColor: "hover:text-blue-700 dark:hover:text-blue-500",
    },
  ];

  return (
    <footer className="relative bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-900 text-gray-900 dark:text-white overflow-hidden border-t border-gray-200 dark:border-gray-800">
      {/* Custom Keyframe Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
            50% { transform: translateY(-10px) rotate(180deg); opacity: 0.5; }
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
        `,
        }}
      />

      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          >
            <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400/90 rounded-full" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Brand Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-400 dark:via-purple-500 dark:to-blue-600 bg-clip-text text-transparent mb-4">
            ProDevelopers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
            Building the future with innovative digital solutions. We create
            impactful experiences that connect people and transform ideas into
            reality.
          </p>
        </div>

        {/* Main Content - 3 Balanced Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-12">
          {/* Navigation Column */}
          <div className="text-center md:text-left ">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center md:justify-start gap-2">
              <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Navigation
            </h3>
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-center md:justify-start gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group"
                  >
                    <item.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
              Get In Touch
            </h3>
            <ul className="space-y-4">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="flex items-center justify-center md:justify-start gap-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group"
                  >
                    <item.icon
                      className={`w-4 h-4 flex-shrink-0 ${item.color}`}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center justify-center md:justify-end gap-2">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Connect
            </h3>
            <div className="flex gap-3 justify-center md:justify-end mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-12 h-12 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.hoverColor} transition-all duration-300 hover:scale-110 hover:bg-gray-300/50 dark:hover:bg-gray-700/50`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">
              <p>Follow us for updates</p>
              <p className="text-blue-600 dark:text-blue-400 mt-1 font-semibold">
                @ProDevelopers
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-8">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-gray-900 p-2 rounded-full">
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse"></div>
            </span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} ProDevelopers. Crafted with ❤️ in India
          </div>
          <div className="flex items-center justify-center gap-x-6 gap-y-2 flex-wrap text-sm text-gray-600 dark:text-gray-400">
            <a
              href="/privacy"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/cookies"
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
