import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EthereumNews from './components/EthereumNews';
import MetaMaskConnect from './components/MetaMaskconnect';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<EthereumNews />} />
      <Route path="/wallet" element={<MetaMaskConnect />} />
    </Routes>
  );
};

export default App;
