import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
            <div className="prose prose-indigo max-w-3xl mx-auto">
                <h1>Terms of Service for LuxeMart</h1>
                
                <p className="text-gray-500">Last updated: November 8, 2025</p>

                <h2>1. Agreement to Terms</h2>
                <p>
                    By accessing or using our website and services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
                </p>

                <h2>2. Accounts</h2>
                <p>
                    When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p>
                    You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>

                <h2>3. Orders and Payment</h2>
                <p>
                    We reserve the right to refuse or cancel any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.
                </p>
                <p>
                    You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                </p>

                <h2>4. Products and Pricing</h2>
                <p>
                    All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time.
                </p>
                <p>
                    We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.
                </p>

                <h2>5. Intellectual Property</h2>
                <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of LuxeMart and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of LuxeMart.
                </p>

                <h2>6. Prohibited Uses</h2>
                <p>You are prohibited from using the site or its content:</p>
                <ul>
                    <li>(a) for any unlawful purpose;</li>
                    <li>(b) to solicit others to perform or participate in any unlawful acts;</li>
                    <li>(c) to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances;</li>
                    <li>(d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others;</li>
                    <li>(e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability;</li>
                    <li>(f) to submit false or misleading information;</li>
                    <li>(g) to upload or transmit viruses or any other type of malicious code.</li>
                </ul>

                <h2>7. Limitation of Liability</h2>
                <p>
                    In no event shall LuxeMart, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>

                <h2>8. Governing Law</h2>
                <p>
                    These Terms shall be governed and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
                </p>

                <h2>9. Changes to These Terms</h2>
                <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>

                <h2>10. Contact Us</h2>
                <p>
                    If you have any questions about these Terms, please <Link to="/contact">contact us</Link> at support@luxemart.com.
                </p>
            </div>
        </div>
    );
};

export default TermsOfService;