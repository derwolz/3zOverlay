
import './App.css';
import Navbar from './App/NavBar';
import { WorkbenchProvider } from './App/Utilities/ContextProvider/ContextProvider.js';
import { WorkBench } from './App/WorkBench.js';
function App() {
  return (
    <div className="" onDrop={(e)=>{e.stopPropagation(); e.preventDefault();}}>
      <header className="">
        <WorkbenchProvider>
      <Navbar/>
      <WorkBench/>
      </WorkbenchProvider>


      </header>
      
    </div>
  );
}

export default App;
