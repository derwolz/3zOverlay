import { useState, useEffect } from "react"

function SVGM({filePath}){
    const [svgContent, setSvgContent] = useState('');

    

    useEffect(()=>{
        fetch(filePath).then(
            response => response.text()
        ).then(
            data =>{
                setSvgContent(data);
            }
        )
    })
    return <div dangerouslySetInnerHTML={{__html:svgContent}}/>;
}
export default SVGM;