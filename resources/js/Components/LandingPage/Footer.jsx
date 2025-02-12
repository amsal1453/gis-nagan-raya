import React from 'react';
import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
      <footer className="bg-gradient-to-r from-[#08244d] to-[#0A4D8C] text-white">
          <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {/* About Section */}
                  <div className="space-y-4">
                      <div className="flex items-center mb-4">
                          <img
                              src="/lambang.png"
                              alt="Logo"
                              className="h-8 mr-2"
                          />
                          <span className="text-lg font-bold">SIG</span>
                      </div>
                      <p className="text-sm text-gray-300">
                          Sistem Informasi Geografis yang menyediakan solusi
                          pemetaan dan analisis spasial untuk kebutuhan Anda.
                      </p>
                  </div>

                  {/* Quick Links */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4">Links</h3>
                      <ul className="space-y-2">
                          <li>
                              <Link
                                  href="/"
                                  className="text-gray-300 hover:text-white transition-colors"
                              >
                                  Home
                              </Link>
                          </li>
                          <li>
                              <Link
                                  href="/#spatial-data"
                                  className="text-gray-300 hover:text-white transition-colors"
                              >
                                  Spatial Data
                              </Link>
                          </li>
                          <li>
                              <Link
                                  href="/#about"
                                  className="text-gray-300 hover:text-white transition-colors"
                              >
                                  About
                              </Link>
                          </li>
                          <li>
                              <Link
                                  href="/#contact"
                                  className="text-gray-300 hover:text-white transition-colors"
                              >
                                  Contact
                              </Link>
                          </li>
                      </ul>
                  </div>

                  {/* Contact Info */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                      <ul className="space-y-2">
                          <li className="flex items-center text-gray-300">
                              <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                              </svg>
                              Jl. Contoh No. 123, Jakarta
                          </li>
                          <li className="flex items-center text-gray-300">
                              <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                  />
                              </svg>
                              info@sigexample.com
                          </li>
                          <li className="flex items-center text-gray-300">
                              <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                  />
                              </svg>
                              +62 123 456 789
                          </li>
                      </ul>
                  </div>

                  {/* Social Media */}
                  <div>
                      <h3 className="text-lg font-semibold mb-4">
                          Media Sosial
                      </h3>
                      <div className="flex space-x-4">
                          <a
                              href="#"
                              className="text-gray-300 hover:text-white transition-colors"
                          >
                              <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                              </svg>
                          </a>
                          <a
                              href="#"
                              className="text-gray-300 hover:text-white transition-colors"
                          >
                              <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                              </svg>
                          </a>
                          <a
                              href="#"
                              className="text-gray-300 hover:text-white transition-colors"
                          >
                              <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                              </svg>
                          </a>
                          <a
                              href="#"
                              className="text-gray-300 hover:text-white transition-colors"
                          >
                              <svg
                                  className="w-6 h-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                              >
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                          </a>
                      </div>
                  </div>
              </div>

              {/* Copyright */}
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
                  <p>
                      &copy; {new Date().getFullYear()} Sistem Informasi
                      Geografis. All rights reserved.
                  </p>
              </div>
          </div>
      </footer>
  );
};

export default Footer;