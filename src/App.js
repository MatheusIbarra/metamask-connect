import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const [error, setError] = useState("");
  const [defaultAccount, setDefaultAccount] = useState("");
  const [userBalance, setUserBalance] = useState("0.0");
  const [buttonText, setButtonText] = useState("Conectar carteira");

  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getUserBalance(newAccount.toString());
  }

  const getUserBalance = (address) => {
    window.ethereum.request({ method: "eth_getBalance", params: [address, 'latest']}).then((balance) => {
      setUserBalance(ethers.utils.formatEther(balance));
    })
  }


  const connectWallet = () => {
    console.log("Conectou")
    if(window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts"}).then((result) => {
        accountChangedHandler(result[0]);
      })
    } else {
      setError("Metamask não instalado");
    }


    setButtonText("Carteira conectada")
  }

  window.ethereum.on('accountsChanged', accountChangedHandler)
  window.ethereum.on('chainChanged', connectWallet)


  return (
    <div className="App">
      <header className="App-header">
        <div className="wallet-wrapper">
          <div className="text">Conectando na Metamask usando window.ethereum</div>
          <button onClick={() => connectWallet()}>{buttonText}</button>
          <div className="text">Endereço: {defaultAccount}</div>
          <div className="text">Ammount: {userBalance}</div>
          <div className="error-text">{error}</div>
        </div>
      </header>
    </div>
  );
}

export default App;
