import { createContext, useState } from "react";
export const WorkbenchContext = createContext();


export function WorkbenchProvider({children}){
    const [savedElements, setElements]=useState([]);
    const [isChanged, setIsChanged] = useState(false);


    // --------------------------------- Conversion FUnctions --------------------------------------

    async function urlToBlob(url){
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    }

    // ------------------------- Local Storage Functions ------------------------------------------
    function saveToLocal(jsonString){
        localStorage.setItem('elements', jsonString);
    }

    function loadFromLocal(){
        const storedElements = JSON.parse(localStorage.getItem('elements'));
            
        //console.log('loadingElements', storedElements);
        return storedElements || [];

    }

// ------------------------------------- indexedDB functions ---------------------------------

    const dbWrite =async (blob) =>{
        try{
            
            const db = await openDB();
            const transaction = db.transaction('3zOverlayStore', 'readwrite')
            const store = transaction.objectStore('3zOverlayStore');
            const request = store.add(blob);

            return new Promise((res, rej)=>{
                request.onsuccess = () =>{
                    setIsChanged(false)
                    //console.log('success writing to db', request);
                    res(request.result);
                }   
                request.onerror = (e) => {
                    rej(e.target.error);
                }
            })
             
            
        }
        catch (err) {
            console.error("error in saving JSON:", err)
        }
    }

    const dbRead = async(key)=>{
        try{
            const db = await openDB();
            const transaction = db.transaction('3zOverlayStore');
            
            const store = transaction.objectStore('3zOverlayStore');
            //console.log('test');
            const request = store.get(key);
            //console.log('here',request);
            return new Promise((res, rej)=>{
                //console.log(request)
                request.onsuccess = (e)=>{
                    //console.log('here')
                    const blob = e.target.result;
                    //console.log('blob:',blob)
                    if (blob instanceof Blob && blob.size > 0){
                        const url = URL.createObjectURL(blob);
                        //console.log('blob url:', url)
                        res(url);
                    }

                }
                request.onerror = (e)=>{
                    console.error('Error reading from db', e.target.error);
                    rej(e.target.error);
                }
            })
        } catch(err){
            console.error('error with reading file', err)
        }
    }

    function openDB(){
        return new Promise((res, rej)=>{
            const request = indexedDB.open('3zOverlay',1);
            //console.log(request);
            request.onupgradeneeded = (e)=>{
                const db = e.target.result;
                db.createObjectStore('3zOverlayStore', {autoIncrement: true});
            }
            request.onerror = (e)=>{
                rej(e.target.error);
            }
            request.onsuccess = (e)=>{
                //console.log('open success');
                res(e.target.result);
            }
        })
    }

    // ------------------------------- Provider Functions -----------------------------------
    
    async function saveElements(){
        for (const elem of savedElements){
            //console.log(elem);
            if (elem.element.type === 'imagedisplay')
                //console.log(elem.element.url, elem.element.image)};
                if (elem.element.image.startsWith('blob:')){
                    console.log('check', elem.element.image);
                    const blob = await urlToBlob(elem.element.image);
                    const response = await dbWrite(blob);
                    elem.element.image = response;
                    const read = await dbRead(await elem.element.image);
                    //console.log('read info:',read)
                }
        }

        const jsonString = JSON.stringify(savedElements);
        saveToLocal(jsonString);    
    }

    function updateElements(newElements){
        setElements(newElements);
        //console.log('updating elements', newElements);
        setIsChanged(true);
    }

    async function loadElements(){
        const elements = loadFromLocal()
        console.log('loadElements',elements);
        for (const elem of elements){
            if (elem.element.type === 'imagedisplay'){
                const newImage = dbRead(elem.element.image);
                //console.log('newImage in loadElements', newImage);
                elem.element.image = await newImage;
            }
        }
        return elements || [];
        
    }

//------------------------------------ Component -------------------------------------
    return (
        <WorkbenchContext.Provider value={{savedElements, isChanged, saveElements, updateElements, loadElements}}>
            {children}
        </WorkbenchContext.Provider>
    )
}