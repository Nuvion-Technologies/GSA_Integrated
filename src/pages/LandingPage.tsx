import React from 'react';
import Home from '../components/Home';
import AboutUs from '../components/AboutUs';
import Academy from '../components/Academy';
import Events from '../components/EventsFiltered';
import ContactUs from '../components/ContactUs';
import Playground from '../components/Playground';
import './scroll.css';

const LandingPage: React.FC = () => {
  return (
    <div>
        <section id='home' className="scroll-section">
            <Home />
        </section>
        <section id='about' className="scroll-section">
            <AboutUs/>
        </section>
        <section id='academy' className='scroll-section'>
            <Academy/>
        </section>
        <section id='events' className='scroll-section'>
            <Events/>
        </section>
        <section id='playground' className='scroll-section'>
            <Playground/>
        </section>
        <section id='contact' className='scroll-section'>
            <ContactUs/>
        </section>
    </div>
  );
};

export default LandingPage;
