import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="prose prose-indigo max-w-3xl mx-auto">
                <h1>Privacy Policy for LuxeMart</h1>
                
                <p className="text-gray-500">Last updated: November 8, 2025</p>

                <h2>1. Introduction</h2>
                <p>
                    Welcome to LuxeMart ("we," "us," or "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices with regard to your personal information, please <Link to="/contact">contact us</Link>.
                </p>
                <p>
                    This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website.
                </p>

                <h2>2. Information We Collect</h2>
                <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products, when you participate in activities on the website, or otherwise when you contact us.</p>
                <p>The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:</p>
                <ul>
                    <li><strong>Personal Information:</strong> Name, shipping address, billing address, email address, and phone number.</li>
                    <li><strong>Payment Data:</strong> We may collect data necessary to process your payment if you make purchases, such as your payment instrument number (e.g., a credit card number). All payment data is stored by our payment processor and you should review its privacy policies.</li>
                    <li><strong>Account Information:</strong> If you create an account, we store your username, password (hashed), and user preferences.</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <p>We use personal information collected via our website for a variety of business purposes described below:</p>
                <ul>
                    <li><strong>To Fulfill and Manage Your Orders:</strong> We use your information to process your payments, ship your orders, and manage your account.</li>
                    <li><strong>To Communicate with You:</strong> We may use your personal information to send you product, service, and new feature information and/or information about changes to our terms, conditions, and policies.</li>
                    <li><strong>To Send You Marketing Communications:</strong> We may use your information for our marketing purposes, if this is in accordance with your marketing preferences. You can opt-out of our marketing emails at any time.</li>
                    <li><strong>To Protect Our Services:</strong> We may use your information as part of our efforts to keep our website safe and secure (for example, for fraud monitoring and prevention).</li>
                </ul>

                <h2>4. Will Your Information Be Shared?</h2>
                <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>
                <ul>
                    <li><strong>Payment Processors:</strong> We share your payment data with our payment processors (e.g., Stripe, PayPal) to complete your transactions.</li>
                    <li><strong>Shipping Carriers:</strong> We share your name and shipping address with shipping companies (e.g., FedEx, UPS) to deliver your orders.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, or legal process.</li>
                </ul>

                <h2>5. Cookies and Tracking Technologies</h2>
                <p>
                    We use cookies and similar tracking technologies to access or store information. Cookies are small data files stored on your hard drive or in device memory that help us improve our website and your experience, see which areas and features of our website are popular, and count visits. For example, we use cookies to keep your items in your shopping cart when you navigate away from the page.
                </p>

                <h2>6. Your Privacy Rights</h2>
                <p>
                    You have certain rights regarding your personal information. Depending on your location, you may have the right to:
                </p>
                <ul>
                    <li>Request access to and obtain a copy of your personal information.</li>
                    <li>Request correction or deletion of your personal information.</li>
                    <li>Opt-out of marketing communications by clicking the "unsubscribe" link in any marketing email we send you.</li>
                </ul>
                <p>To exercise these rights, please contact us using the information below.</p>

                <h2>7. Data Security</h2>
                <p>
                    We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. We use SSL technology to encrypt data during transmission. However, despite our safeguards, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
                </p>

                <h2>8. Changes to This Policy</h2>
                <p>
                    We may update this privacy notice from time to time. The updated version will be indicated by an updated "Last updated" date. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                    If you have questions or comments about this notice, you may <Link to="/contact">contact us by email</Link> at support@luxemart.com or by post to:
                </p>
                <address>
                    LuxeMart
                    <br />
                    123 LuxeMart Street
                    <br />
                    Oyo State, Nigeria
                </address>
            </div>
        </div>
    );
};

export default PrivacyPolicy;