import ImageIcon from './icons/image.svg';
import TextIcon from './icons/text.svg';
import SlideShowIcon from './icons/slideshow.svg';
import ListIcon from './icons/list.svg';
const cssGroup = {
    fontFamily:{type: 'DropDown', label: 'Font', value:'Sans Serif', values:['Sans Serif']},
    fontSize:{type: 'TextInput',label:'Size', value:'12pt'},
    color:{type: 'ColorSelector',label:'color', value:'#000000'},
    backgroundColor: {type: 'ColorSelector', value:`rgba(0,0,0,0)`},
}

const textdisplay = {
    text: 'Text Display',
    type:'TextDisplay',
    icon:TextIcon,
    pos : {x:0,y:0},
    parentId : '',
    style:{backgroundColor:'white', color:'red'},
    gui: {
        settings: {TextValue:{type: 'TextInput',label:'Text', value:''}},
        position: [ {type: 'NumberInput',label:'x', value: 0},
                    {type: 'NumberInput',label:'y', value: 0}],
        css: cssGroup, 
    }
}

const imagedisplay = {
    
    type : "Image Display",
    url : "",
    icon:ImageIcon,
    pos : {x:0,y:0},
    parentId : '',

    gui : {
        settings: {url: {type: 'TextInput', label:'url', value: 'hello there'}},
        css: cssGroup,
    }
}

const listdisplay= {
    text : 'List Display',
    type : 'ListDisplay',
    contents : [],
    icon:ListIcon,
    pos : {x:0,y:0},
    parentId : '',
    gui : {
        settings: {type: 'list', value : []},
        css: cssGroup,
    }
}
const slideshowdisplay ={
    text : 'Slide Show Display',
    type : 'SlideShowDisplay',
    contents : [],
    icon:SlideShowIcon,
    pos : {x:0,y:0},
    parentId : '',
    gui : {
        settings: {type: 'list', value : []},
        css: cssGroup,
    }
}
const templates = {
    textdisplay,
    listdisplay,
    slideshowdisplay,
    imagedisplay,
}
export {
    textdisplay, 
    templates,
    
}