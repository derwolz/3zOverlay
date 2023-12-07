import './GuiButton.css';
export default function GuiCreationButton({text, image}){

    return (
        <div>
            <button style={{ marginTop: '30px'}}><img height={'30px'} width={'30px'} src={image}/>&nbsp;&nbsp;{text}</button>
        </div>
    )
}