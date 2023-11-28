import './GuiButton.css';
export default function GuiCreationButton({text, image}){
    return (
        <div>
            <button style={{ marginTop: '30px'}}><img src={image}/>&nbsp;&nbsp;{text}</button>
        </div>
    )
}