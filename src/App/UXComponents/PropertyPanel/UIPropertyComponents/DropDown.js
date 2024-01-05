export function DropDown({value, values, label}){

    return(
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
    <label>{label}</label>
    <select value={value} style={{border:'1px solid var(--purple-mid)', borderRadius:'3px', backgroundColor:'var(--purple-lightest)'}}>    
        {values.map((value, key)=>{
            return(
                <option key={key} value={value}>{value}</option>
            )
        })}
    </select>
    </div>
    )
}