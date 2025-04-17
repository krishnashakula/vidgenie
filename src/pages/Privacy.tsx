
import React from "react";
import PageLayout from "@/components/layout/PageLayout";

const Privacy = () => {
  return (
    <PageLayout>
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: April 17, 2025
          </p>

          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              At AI Video Creator, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
            </p>

            <h2>2. Information We Collect</h2>
            <p>
              We collect several types of information from and about users of our Service, including:
            </p>
            <ul>
              <li>Personal information (such as name, email address, and payment information)</li>
              <li>Usage data (how you use our Service)</li>
              <li>Content data (information you input for video creation)</li>
              <li>Device information (browser type, IP address, and operating system)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul>
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages, updates, and security alerts</li>
              <li>Respond to customer service requests</li>
              <li>Analyze usage patterns and improve user experience</li>
              <li>Train and improve our AI models</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>
              We may share your information with:
            </p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with your consent</li>
              <li>Legal authorities when required by law</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>6. Your Data Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul>
              <li>Access to your data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our Service is not intended for children under 16 years of age, and we do not knowingly collect personal information from children under 16.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@aivideoai.com.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
