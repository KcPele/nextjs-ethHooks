import {
  useBalance,
  useContractReader,

} from "eth-hooks";
import { useStateContext } from "../context/StateContext";
import { useEventListener } from "eth-hooks/events/useEventListener";
import React, { useState } from "react";
import { Account } from '../components'
const Home = () => {
  const { 
      web3Modal,
        blockExplorer,
        localProvider,
        mainnetProvider,
        userSigner,
        price,
        loadWeb3Modal,
        logoutOfWeb3Modal,
        readContracts,
        writeContracts,
        tx,
        address
    } = useStateContext()
  
  const storageAddress =
      readContracts && readContracts.Storage && readContracts.Storage.address;
  
    const storageETHBalance = useBalance(localProvider, storageAddress);
  
  
    //useContractReader it is use to read a function or any value that is not writing to the smart contract
    // const anyName = useContractReader(readContract, "ContractName", "function name in smart contract", [if it accepts any args])
    const retrieveNumber = useContractReader(
      readContracts,
      "Storage",
      "retrieveNumber"
    )
    const retrieveValue = useContractReader(
      readContracts,
      "Storage",
      "retrieveValue"
    );
    
    const retrieveBalance = useContractReader(
      readContracts,
      "Storage",
      "retrieveBalance"
    );
  
    //constantly listing to event emited in the contract
    const storeNumberEvents = useEventListener(
      readContracts,
      "Storage",
      "StoreNumber",
      localProvider,
      1
    );
    
    const storeValueEvents = useEventListener(
      readContracts,
      "Storage",
      "StoreValue",
      localProvider,
      1
    );
  
    const [num, setNum] = useState(0);
    const [val, setVal] = useState("");
  
    const handleStoreNumber = async (e) => {
      e.preventDefault();
      console.log(num);
      // console.log(mainnetContracts)
       // to write to your contract 
       await tx(writeContracts.Storage.storeNumber(num),);
       setNum(0)
      console.log("📟 storeValueEvents:", storeNumberEvents);
      
    };
    const getStoredNumber = () => {
      console.log(retrieveNumber);
    };
    const handleStoreValue = async (e) => {
      e.preventDefault();
      
      // to write to your contract 
      await tx(writeContracts.Storage.storeValue(val));
      setVal("")
      console.log("📟 storeValueEvents:", storeValueEvents);
    };
    const getStoredValue = () => {
      console.log(retrieveValue);
    };
    const getContractBalance = () => {
      console.log("blance");
      console.log("retrieve   Balance", retrieveBalance);
      console.log("storage balance", storageETHBalance);
    };
    
return (
  <>
  <Account
  address={address}
  localProvider={localProvider}
  userSigner={userSigner}
  mainnetProvider={mainnetProvider}
  price={price}
  web3Modal={web3Modal}
  loadWeb3Modal={loadWeb3Modal}
  logoutOfWeb3Modal={logoutOfWeb3Modal}
  blockExplorer={blockExplorer}
/>

    <h2>Start up</h2>
    <button onClick={getContractBalance}>Contract Balance</button>
    <hr />
    <button onClick={getStoredNumber}>Get Stored Number</button>
    <p>The stored number is {retrieveNumber && retrieveNumber.toNumber()}</p>
    <form onSubmit={handleStoreNumber}>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
      />
      <button type="submit">Store Number</button>
    </form>
    <hr />
    <div>
      <p>Value: {retrieveValue}</p>
      <button onClick={getStoredValue}>Get Stored Number</button>
      <form onSubmit={handleStoreValue}>
        <input
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button type="submit">Store value</button>
      </form>
    </div>
    <div>
   
    </div>
  </>
)
}

export default Home