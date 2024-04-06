import React from 'react';
import './fin.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import sbiImage from '../images/sbi.png';
import uniImage from '../images/union.png';
import hdfcImage from '../images/HDFC1.png';

const banks = [
  {
    name: 'SBI',
    image: sbiImage,
    link: 'https://homeloans.sbi/',
    keyPoints: [
      '1.Attractive Interest Rates',
      '2.Assistance in choosing the right property',
      '3.Low EMIs at interest rate of 8.15% p.a.',
    ],
  },
  {
    name: 'UNION BANK',
    image: uniImage,
    link: 'https://www.unionbankofindia.co.in/english/apply-online-home-loan.aspx',
    keyPoints: [
      '1.Government-owned bank with a focus on social banking',
      '2.Competitive interest rates and loan options',
      '3.Extensive branch network across India',
    ],
  },
  {
    name: 'HDFC',
    image: hdfcImage,
    link: 'https://www.hdfc.com/housing-loans/home-loans',
    keyPoints: [
      '1.Competitive interest rates',
      '2.Wide range of loan options (purchase, resale, plot, renovation, extension)',
      '3.Online application and processing',
    ],
  },
  { name: 'Bank 4', image: 'https://via.placeholder.com/150', link: 'https://placeholder.com', keyPoints: [] },
  { name: 'Bank 5', image: 'https://via.placeholder.com/150', link: 'https://placeholder.com', keyPoints: [] },
  { name: 'Bank 6', image: 'https://via.placeholder.com/150', link: 'https://placeholder.com', keyPoints: [] },
];

const BankBox = ({ name, image, link, keyPoints }) => {

  return (
    <div className="bank-box">
      <img src={image} alt={name} /><br />
      <a className="bank-button" href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
      {/* Button with name as text */}
      <ul className="key-points">
        {keyPoints.length > 0 && ( // Conditionally render key points if available
          <>
            <h3>Key Points</h3>
            {keyPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search Bank" />
    </div>
  );
};

const Finance = () => {
  const history = useHistory(); // Utilize useNavigate hook for navigation

  const handleEmiclick = () => {
    history.push('/emi-calculator'); // Navigate to EMI calculator route
  };

  return (
    <div>
      <header id="header">
        <h1>FINANCE</h1>
        <div className="header-container">
          <button className="emi-button" onClick={handleEmiclick}>EMI Calculator</button>
          <SearchBar />
        </div>
      </header>
      <div className="bank-container">
        {banks.map((bank) => (
          <BankBox key={bank.name} {...bank} />
        ))}
      </div>
    </div>
  );
};

export default Finance;
