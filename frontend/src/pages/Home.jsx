import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProductShowcase from '../components/home/ProductShowcase';
import FactorySection from '../components/home/FactorySection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import InquiryCTA from '../components/home/InquiryCTA';
import StatsSection from '../components/home/StatsSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Kartik Paver Industries - Premium Quality Paver Block Solutions | Latur</title>
        <meta name="description" content="Kartik Paver Industries, Latur MIDC - Leading manufacturer of high-strength paver blocks in Maharashtra. I Shape, Zig Zag, Rectangular, Grass Paver Blocks, Kerb Stones. Call for best prices." />
        <meta name="keywords" content="paver block manufacturer Latur, paver blocks Maharashtra, I shape paver block, zig zag paver block, kerb stone, grass paver block, Kartik Paver Industries, MIDC Latur" />
        <link rel="canonical" href="https://www.kartikpaver.com/" />
      </Helmet>
      <HeroSection />
      <StatsSection />
      <ProductShowcase />
      <WhyChooseUs />
      <FactorySection />
      <TestimonialsSection />
      <InquiryCTA />
    </>
  );
};

export default Home;
