import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.jsx';
import EmailCheck from './components/EmailCheck.jsx';
import Footer from './components/Footer.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header base="/" />
    <main><EmailCheck /></main>
    <Footer base="/" />
  </React.StrictMode>
);
