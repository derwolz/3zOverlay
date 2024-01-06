function update(){
    const event = new Event('update');
    window.dispatchEvent(event);
}
export {update};