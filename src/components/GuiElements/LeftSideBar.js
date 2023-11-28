import './LeftSideBar.css';
import GuiCreationButton from './GuiButtons/GuiButton';
export default function LeftSideBar( {elements}){
    return (
        <div className="LeftSideBar">
            {Object.keys(elements).map((element)=>{
                return (<GuiCreationButton text={element.text} image={element.image}/>)
            })}
            <div className="border"/>
        </div>
    )
}