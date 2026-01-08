import React from 'react';

const PageLayout = ({ title, children }) => (
    <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
        <h1 style={{ marginBottom: '20px', fontSize: '2rem', fontWeight: 'bold' }}>{title}</h1>
        <div className="content">
            {children || <p>This page is currently under construction. Please check back later.</p>}
        </div>
    </div>
);

export const Contact = () => <PageLayout title="Contact Us" />;
export const Blog = () => <PageLayout title="Our Blog" />;
export const Terms = () => <PageLayout title="Terms & Conditions" />;
export const PaymentTerms = () => <PageLayout title="Payment Terms & Conditions" />;
export const GiftCardTerms = () => <PageLayout title="Gift Card Terms & Conditions" />;
export const ShippingPolicy = () => <PageLayout title="Shipping & Return Policy" />;
export const CreateReturn = () => <PageLayout title="Create Return" />;
export const GiftCard = () => <PageLayout title="Buy Gift Cards" />;
export const TrackReturn = () => <PageLayout title="Track Your Return" />;
export const FAQ = () => <PageLayout title="Frequently Asked Questions" />;
export const PrivacyPolicy = () => <PageLayout title="Privacy Policy" />;
export const LoyaltyTerms = () => <PageLayout title="Loyalty Points Terms & Conditions" />;
export const SBIOffers = () => <PageLayout title="SBI Offers Terms & Conditions" />;
