'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

interface PowerLeague {
  title: string;
  registrationLink?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [leagues, setLeagues] = useState<PowerLeague[]>([]);
  const registrationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await fetch('/api/leagues');
        const data = await response.json();
        console.log("Fetched leagues data:", data);
        if (Array.isArray(data)) {
          setLeagues(data);
        } else {
          console.warn("Data is not an array:", data);
          setLeagues([]);
        }
      } catch (error) {
        console.error("Error fetching leagues:", error);
        setLeagues([]);
      }
    };

    fetchLeagues();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (registrationRef.current && !registrationRef.current.contains(event.target as Node)) {
        setRegistrationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'League Info', href: '/information' },
    // { label: 'Schedule', href: '/tournament-information#schedule' },
    // { label: 'Gallery', href: '/gallery' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-3xl text-red-700 hover:text-red-800 transition-colors" style={{ fontFamily: "var(--font-anton)" }}>
            <span>Lake Michigan Power Leagues</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Registration Dropdown */}
            <div 
              className="relative group" 
              ref={registrationRef}
              onMouseEnter={() => setRegistrationOpen(true)}
              onMouseLeave={() => setRegistrationOpen(false)}
            >
              <button
                onClick={() => setRegistrationOpen(!registrationOpen)}
                className={`transition-colors font-medium ${registrationOpen ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
              >
                Registration
              </button>

              {/* Dropdown Menu - positioned with overlap to prevent hover gap */}
              {registrationOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-0 pt-2 z-50">
                  <div className="bg-white border border-gray-200 rounded-lg shadow-xl whitespace-nowrap">
                    {leagues.length > 0 ? (
                      leagues.map((league) =>
                        league.registrationLink ? (
                          <a
                            key={league.title}
                            href={league.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0 border-gray-100"
                          >
                            {league.title}
                          </a>
                        ) : null
                      )
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">Loading leagues...</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Registration Dropdown Mobile */}
            <div ref={registrationRef}>
              <button
                onClick={() => setRegistrationOpen(!registrationOpen)}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium flex items-center justify-between"
              >
                Registration
                <svg className={`w-4 h-4 transition-transform ${registrationOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {registrationOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  {leagues.length > 0 ? (
                    leagues.map((league) =>
                      league.registrationLink ? (
                        <a
                          key={league.title}
                          href={league.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors text-sm"
                          onClick={() => setIsOpen(false)}
                        >
                          {league.title}
                        </a>
                      ) : null
                    )
                  ) : (
                    <div className="px-4 py-2 text-gray-500 text-sm">Loading leagues...</div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
