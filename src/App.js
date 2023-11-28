import logo from './logo.svg';
import './App.css';
import DragnDrop from './components/DragnDrop';
import TextDisplay from './components/components/textDisplay/TextDisplay';
import Navbar from './components/GuiElements/NavBar';
import LeftSideBar from './components/GuiElements/LeftSideBar';
import RightSideBar from './components/GuiElements/RightSideBar';
import { guiButtonElements } from './components/GuiElements/GuiButtons/guiButtonElements';
function App() {
  return (
    <div className="">
      <header className="" style={{backgroundColor:'black', height:'100vh'}}>
      <Navbar/>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <LeftSideBar elements={guiButtonElements}/>
      <RightSideBar/>
      </div>



      </header>
      
    </div>
  );
}

export default App;
