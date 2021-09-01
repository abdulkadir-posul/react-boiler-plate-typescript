import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import ScrollToTop from './routes/ScrollToTop';
import PageContainer from './containers/PageContainer';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageContainer>
        <Routes />
      </PageContainer>
    </Router>
  );
}

export default App;
