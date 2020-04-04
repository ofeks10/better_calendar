import React from 'react';

import {
    BrowserRouter as Router,
} from 'react-router-dom';

import Header from './components/Header/components/Header.js'
import MainContent from './components/MainContent/components/MainContent.js'
import Footer from './components/Footer/components/Footer.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function App() {
    return (
        <div className="text-center">
            <Router>
                <Header />
                <MainContent />
                <Footer />
            </Router>
        </div>
  )
}

export default App;
