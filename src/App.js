
import './App.css';
import Navbar from './App/NavBar';
import { WorkBench } from './App/WorkBench.js';
function App() {
  return (
    <div className="">
      <header className="" style={{backgroundColor:'black', height:'100vh'}}>
      <Navbar/>
      <WorkBench/>


      </header>
      
    </div>
  );
}

export default App;
