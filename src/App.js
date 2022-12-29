import Content from "./Component/Content";
import { DataProvider } from "./Context/DataContext";
// import Footer from "./Component/Footer";
// import Header from "./Component/Header";
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Transaction from "./Component/Transaction";
import Home from "./Component/Home";


function App() {
  return (
    <div className="App">
     {/* <Header /> */}
     <DataProvider>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catagory" element={<Content />} />
      <Route path="/transaction" element={<Transaction />} />
     </Routes>
     </DataProvider>
     
     {/* <Footer /> */}
    
    </div>
  );
}

export default App;
