import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p><strong>Last updated: November 2024</strong></p>

      <section>
        <h2>Introduction</h2>
        <p>Welcome to [Your App Name]! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our bus booking services.</p>
      </section>

      <section>
        <h2>1. Information We Collect</h2>
        <p>We collect the following types of information when you use our app:</p>
        <ul>
          <li>Personal information (name, email, phone, etc.)</li>
          <li>Booking information (routes, dates, preferences)</li>
          <li>Payment information (credit card details)</li>
          <li>Location information (for personalized services)</li>
          <li>Usage data (how you interact with the app)</li>
          <li>Cookies and similar technologies</li>
        </ul>
      </section>

      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>To process your bookings and payments</li>
          <li>To improve our services and app performance</li>
          <li>To communicate with you regarding your bookings</li>
          <li>To send promotional offers (with your consent)</li>
        </ul>
      </section>

      <section>
        <h2>3. Sharing Your Information</h2>
        <p>We do not sell your information. However, we may share it with service providers and in compliance with legal obligations.</p>
      </section>

      <section>
        <h2>4. How We Protect Your Information</h2>
        <p>We use encryption and other security measures to protect your data, but cannot guarantee absolute security.</p>
      </section>

      <section>
        <h2>5. Your Rights and Choices</h2>
        <p>You can access, update, or delete your information, opt-out of marketing, and control cookie preferences at any time.</p>
      </section>

      <section>
        <h2>6. Children’s Privacy</h2>
        <p>Our services are not for children under 13, and we do not knowingly collect information from them.</p>
      </section>

      <section>
        <h2>7. Changes to This Privacy Policy</h2>
        <p>We may update this policy, and any changes will be posted here with the "Last updated" date.</p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>If you have any questions, contact us at:</p>
        <p>[Your Company Name]</p>
        <p>[Email Address]</p>
        <p>[Phone Number]</p>
      </section>

      <div className="back-to-home">
        <a href="/" className="home-link">Back to Home</a>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
