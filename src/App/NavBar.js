import './NavBar.css'
export default function Navbar() {

    return (
        <div className={'navBarBox'}>
            <div className={'navOrder'}>
            <div className={'navPositioning'}>
                <div className={'logo'}>hi there</div>
                <div className={'menu'}>
                    <button style={{margin: '0px 3px'}}>Publish</button>
                    <button style={{margin: '0px 3px'}}>settings</button>
                </div>
            </div>
            
            </div>
            <div className={'bottomBorder'}></div>
            
        </div>
    )
}