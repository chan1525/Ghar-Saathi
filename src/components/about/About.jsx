import React from "react"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/about.jpg"
import "./about.css"

const About = () => {
  return (
    <>
      <section className='about'>
        <Back name='About Us' title='About Us - Who We Are?' cover={img} />
        <div className='container flex mtop'>
          <div className='left row'>
            <Heading title='Ghar Saathi' subtitle='Unlocking the door to your dream home' />

            <p>Our platform is dedicated to helping individuals navigate the complex process of constructing their dream homes, from start to finish. We provide a variety of services that cater to all their needs, whether it's finding the best interest rates on home loans, helping them locate the perfect site that meets their unique preferences, or providing contact details for trusted dealers.</p>
            <p>Our commitment to excellence extends beyond home construction. We also offer a range of options for laborers, architects, and interior designers to showcase their skills and expertise to potential clients. By listing themselves on our platform, these professionals can expand their reach and connect with individuals in need of their services.</p>
            <button className='btn2'>More About Us</button>
          </div>
          <div className='right row'>
            <img src='./immio.jpg' alt='' />
          </div>
        </div>
      </section>
    </>
  )
}

export default About
