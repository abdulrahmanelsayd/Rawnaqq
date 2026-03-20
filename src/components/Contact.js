import React from 'react';
import { config } from '../data';
import './Contact.css';

export function Contact() {
    const { contact } = config;

    return (
        <footer className="contact-footer">
            <div className="contact-header">
                <h4 className="contact-title">
                    تواصل معنا
                </h4>
            </div>

            <nav className="contact-nav" aria-label="روابط التواصل الاجتماعي">
                {contact.whatsapp && (
                    <a href={contact.whatsapp} aria-label="تواصل معنا عبر واتساب" className="contact-link">
                        WhatsApp
                    </a>
                )}
                {contact.instagram && (
                    <a href={contact.instagram} aria-label="تابعنا على انستغرام" className="contact-link">
                        Instagram
                    </a>
                )}
                {contact.facebook && (
                    <a href={contact.facebook} aria-label="تابعنا على فيسبوك" className="contact-link">
                        Facebook
                    </a>
                )}
            </nav>

            <div className="contact-copyright">
                © {new Date().getFullYear()} Rawnaq. All rights reserved.
            </div>
        </footer>
    );
}
