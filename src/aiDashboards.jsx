import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/Header.jsx';
import Page from './pages/AIDashboardsPage.jsx';
import Footer from './components/Footer.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header base="/" cta="#contact" />
    <main><Page /></main>
    <Footer base="/" />
  </React.StrictMode>
);
