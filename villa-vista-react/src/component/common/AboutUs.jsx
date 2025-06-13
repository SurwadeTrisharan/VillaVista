import React from "react";


const AboutUs = () => {
  return (
    <div className="aboutus-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2>Discover the Story Behind VillaVista</h2>
          <p>Where elegance meets comfort in every villa stay</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-grid">
          <img src="/assets/images/Mountainside_Luxury_Villa.jpg" alt="Our Villas" className="about-image" />
          <div className="about-text">
            <h3>Who We Are</h3>
            <p>
              VillaVista was founded with a passion for delivering unforgettable vacation
              experiences. We specialize in providing handpicked luxury villas that offer
              privacy, comfort, and the charm of local culture. Whether it’s a romantic
              getaway or a family escape, our mission is to make every stay magical.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-content">
          <h3>Our Mission</h3>
          <p>
            At VillaVista, we believe that travel should not just be a journey—it should be an
            experience. Our mission is to redefine villa holidays by curating unique stays,
            delivering exceptional service, and helping you create lifelong memories.
          </p>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team-section">
        <h3>Meet Our Team</h3>
        <div className="team-grid">
          <div className="team-member">
            <img src="/assets/images/Trisharan.jpg" alt="CEO" />
            <h4>Trisharan Surwade</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="/assets/images/Dhanshri.jpg" alt="Manager" />
            <h4>Dhanshri Chaudhari</h4>
            <p>Operations Manager</p>
          </div>
          {/* <div className="team-member">
            <img src="/assets/images/Aditya.jpeg" alt="Support" />
            <h4>Vaibhav Salwe</h4>
            <p>Guest Relations</p>
          </div> */}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h3>What Our Guests Say</h3>
        <div className="testimonials-grid">
          <div className="testimonial">
            <p>
              "Staying at VillaVista was the best part of our trip! The view, the pool, the
              vibes—everything was perfect."
            </p>
            <div className="author">– Emma Wilson</div>
          </div>
          <div className="testimonial">
            <p>
              "Impeccable service and beautiful villas. Will definitely book again for our next
              holiday!"
            </p>
            <div className="author">Raj Mehta</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
