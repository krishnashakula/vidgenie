
import React from "react";
import PageLayout from "@/components/layout/PageLayout";

const Terms = () => {
  return (
    <PageLayout>
      <div className="container py-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: April 17, 2025
          </p>

          <div className="prose max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the AI Video Creator service ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              AI Video Creator provides an automated video creation platform that uses artificial intelligence to generate scripts, audio narration, and visuals to produce videos based on user input.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. You are responsible for safeguarding the password and for all activities that occur under your account.
            </p>

            <h2>4. User Content</h2>
            <p>
              Our Service allows you to input content for video creation. You retain ownership of your content, but by uploading it, you grant us a license to use it for providing and improving our Service. You are responsible for ensuring you have the rights to any content you submit.
            </p>

            <h2>5. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding User Content) are and will remain the exclusive property of AI Video Creator and its licensors. The Service is protected by copyright, trademark, and other laws.
            </p>

            <h2>6. Payment Terms</h2>
            <p>
              Some aspects of the Service may be provided for a fee. You agree to pay all fees associated with your chosen subscription plan. Fees are non-refundable except as required by law or as explicitly stated in our refund policy.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall AI Video Creator, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@aivideoai.com.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;
