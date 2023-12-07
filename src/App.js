import logo from './logo.svg';
import './App.css';
import DragnDrop from './components/DragnDrop';
import Navbar from './components/GuiElements/NavBar';
import PropertiesMenu from './components/GuiElements/PropertiesMenu';
import AddMenu from './components/GuiElements/AddMenu';
import { guiButtonElements } from './components/GuiElements/GuiButtons/guiButtonElements';
import { WorkBench } from './components/WorkBench.js';
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
