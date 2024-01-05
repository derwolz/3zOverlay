import { useRef, useState, useEffect } from 'react'
import './NavBar.css'
export default function Navbar({mode}) {
    const [hideBar, setHideBar] = useState(true);
    const navBar = useRef(null)
    function saveMap(){
        navBarAnimation();
        callSave();
    }
    function callSave(){
        // this is an event that will trigger a series of save calls across various elements and save them to localstorage.
    }
    function navBarAnimation(){
        if (hideBar){
            navBar.current.classList.add('nav-y-slide');
            setTimeout(()=>{navBar.current.classList.remove('nav-y-slide');setHideBar(false)}, 300);
        }else {
                navBar.current.classList.add('nav-y-slide-reverse');
                setHideBar(true);
                setTimeout(()=>{navBar.current.classList.remove('nav-y-slide-reverse')}, 300);

        }
    }
    useEffect(()=>{
        if (mode === 'edit'){setHideBar(true)};
        if (mode === 'publish') {setHideBar(false)};
    }, [mode])
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
         </>:null}
         

        
        </div>

    )
}