import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

import {Web3} from 'web3';

//import the contract address and the ABI
const ADDRESS = '0xCfe23921b3f37080886b6b0e700287e46dDF5E4c';
const ABI = [{"inputs":[{"internalType":"uint256","name":"startingPoint","type":"uint256"},{"internalType":"string","name":"startingMessage","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"decreaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNumber","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"increaseNumber","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"message","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"newMessage","type":"string"}],"name":"updateMessage","outputs":[],"stateMutability":"nonpayable","type":"function"}];

function App() {
  const [number, setNumber] = useState("none");
  const [currentMessage, setCurrentMessage] = useState("none");
  const [newMessage, setNewMessage] = useState("");

  const web3 = new Web3(window.ethereum);

  const myContract = new web3.eth.Contract(ABI, ADDRESS);

  async function getNumber() {
    const result = await myContract.methods.getNumber().call();
    setNumber(result.toString())
  }

  async function getNewMessage(){
    const message = await myContract.methods.message().call();
    setCurrentMessage(message);
  }

  async function increaseNumber() {
    const accountsConnected = await web3.eth.requestAccounts();
    const tx = await myContract.methods.increaseNumber().send({ from: accountsConnected[0]});
    getNumber();

  }
  async function decreaseNumber() {
    const accountsPresent = await web3.eth.requestAccounts();
    const transact = await myContract.methods.decreaseNumber().send({ from: accountsPresent[0]});
    getNumber();

  }
  async function updateMessage() {
    const connectedAccounts = await web3.eth.requestAccounts();
    const Transaction = await myContract.methods.updateMessage(newMessage).send({ from: connectedAccounts[0]});
    getNewMessage();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={(getNumber)}>Get Number</button>
        <br />
        <button onClick={increaseNumber}>Increase Number</button>
        <br/>
        <button onClick={decreaseNumber}>Decrease Number</button>
        <br/>
        <p>Number: {number}</p>
        <br/>
        <button onClick={getNewMessage}>Get Message</button>
        <br/>
        <p>Message: {currentMessage} </p>
        <br/>
        <input
           type="text"
           value={newMessage}
           onChange={(e) => setNewMessage(e.target.value)}
           placeholder='Enter New Message'
        />
        <br/>
        <button onClick={updateMessage}>Update Message</button>
        <br/>
      </header>
    </div>
  );
}

export default App;
