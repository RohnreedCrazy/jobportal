import React from 'react';
import PageContainer from 'src/components/container/PageContainer';

// components
import Banner from '../../../components/landingpage/banner/Banner';
import C2a from '../../../components/landingpage/c2a/C2a';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import DemoSlider from '../../../components/landingpage/demo-slider/DemoSlider';
import DreamJob from '../../../components/landingpage/dream-job/DreamJob';
import Features from '../../../components/landingpage/features/Features';
import Footer from '../../../components/landingpage/footer/Footer';
import LpHeader from '../../../components/landingpage/header/Header';
import Header from 'src/layouts/full/vertical/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';

const Landingpage = () => {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      {/* <LpHeader /> */}
      <Header />
      <Banner />
      <DemoSlider />
      <DreamJob />
      <Testimonial />
      <Features />
      <C2a />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
