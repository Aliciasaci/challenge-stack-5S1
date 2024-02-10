import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { LayoutProvider } from './layout/context/layoutcontext.jsx';
import Layout from './layout/layout.jsx';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './assets/styles/layout/layout.scss';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Router>
      <LayoutProvider>
        <Layout> */}
          <App />
        {/* </Layout>
      </LayoutProvider>
    </Router> */}
  </React.StrictMode>,
)
