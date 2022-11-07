import React from "react"

export default function Kockica(props){
    const styles={
        backgroundColor: props.isHeld? " rgb(188, 155, 221)"  : "white"
    }
    return(
        <div style={styles} className="kockica" onClick={()=>props.oznaci(props.id)}>
            {props.value}
        </div>
    )
}
