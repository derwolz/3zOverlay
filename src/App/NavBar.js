import { useRef, useState, useEffect, useContext } from 'react'
import { WorkbenchContext } from './Utilities/ContextProvider/ContextProvider';
import './NavBar.css'
export default function Navbar({ mode }) {
    const [hideBar, setHideBar] = useState(true);
    const navBar = useRef(null)
    const { saveElements,isChanged } = useContext(WorkbenchContext);
    function saveMap() {
        navBarAnimation();
        callSave();
    }
    function callSave() {
        // this is an event that will trigger a series of save calls across various elements and save them to localstorage.
        saveElements();
    }
    function navBarAnimation() {
        if (hideBar) {
            if (navBar.current.classList){
                console.log('navBar.current.classList', navBar.current.classList);
                navBar.current.classList.add('nav-y-slide');

                setTimeout(() => { navBar.current.classList.remove('nav-y-slide')}, 300);
            }
            
        } else {
            if (navBar.current.classList){

                console.log('navBar.current.classList', navBar.current.classList);
                navBar.current.classList.add('nav-y-slide-reverse');
                setHideBar(true);
                setTimeout(() => { navBar.current.classList.remove('nav-y-slide-reverse') }, 300);
            }
            

        }
    }
    useEffect(() => {
        if (mode === 'edit') { setHideBar(true) };
        if (mode === 'publish') { setHideBar(false) };
    }, [mode])
    useEffect(()=>{
        navBarAnimation();
        setTimeout(()=>{
            setHideBar(isChanged)
        }, 300);
        console.log(isChanged);
    }, [isChanged])
    return (
        <div className={'navBarBox'} ref={navBar}>
            {hideBar ? <>

                <div className={'navOrder'}>
                    <div className={'navPositioning'}>
                        <div></div>
                        <div className={'logo'}>3zOverlay</div>
                        <div className={'menu'}>
                            <button className={'save-button'} onClick={saveMap}>Save</button>
                        </div>
                    </div>

                </div>
                <div className={'bottomBorder'}></div>
            </> : null}



        </div>

    )
}