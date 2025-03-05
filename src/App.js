import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import './App.css';
import './index.css'; // Make sure this imports your Tailwind styles
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import MainContent from './components/common/MainContent';

const App = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex  flex-1">
                    <Sidebar />
                    <MainContent />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;


