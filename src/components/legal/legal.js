import React from 'react';
import './legal.css'; // Import the CSS file

const teamMembers = [
  {
    name: 'John Doe',
    title: 'General Counsel',
    imageUrl: 'https://www.carvermostardi.com/cmos/wp-content/uploads/2018/05/corporate_headshots_tampa_002.jpg', // Replace with your image URL
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod nibh eu ipsum laoreet, at feugiat nisl pretium.'
  },
  {
    name: 'John Doe',
    title: 'General Counsel',
    imageUrl: 'https://images.unsplash.com/photo-1592009309602-1dde752490ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80', // Replace with your image URL
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod nibh eu ipsum laoreet, at feugiat nisl pretium.'
  },
  {
    name: 'John Doe',
    title: 'General Counsel',
    imageUrl: 'https://c.pxhere.com/photos/93/c7/businessman_man_portrait_male_costume_business_office_office_style-815849.jpg!d', // Replace with your image URL
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod nibh eu ipsum laoreet, at feugiat nisl pretium.'
  },
  // Add more team members here
];

function LegalTeam() {
  return (
    <div className="legal-team">
      <header className="header">
        <h1>Legal Team</h1>
      </header>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div className="team-member" key={index}>
            <img src={member.imageUrl} alt={member.name} style={{ objectFit: 'cover', width: '50%', height: '58%' }} />
            <div className="member-info">
              <h3>{member.name}</h3>
              <p>{member.title}</p>
              <p>{member.description}</p>
              <button className="contact-button">contact</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LegalTeam;
