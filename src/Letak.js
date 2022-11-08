import React from "react"
import nextId from "react-id-generator";

export default function Letak(props){
    const red=["1","2","3","4","5","6","Min","Max","Tris","Skala","Full","Poker","Jamb"]
  
    const table= red.map(function(ele, br){
            const tabbleRow=
            <tr key={nextId()}>
                <th key={ele}>{ele}</th>
            {[0,1,2].map(function(elem, bro){
                let index=(br*3)+bro
                return (<td key={`${ele}-${elem}`}><button 
                    key={index}
                    onClick={()=>props.upisi(props.rezultati[index].ozn, index)}>
                        {props.rezultati[index].value}</button>
                    </td>)
            })}
            </tr>
            return tabbleRow
       })


    return(
        <div className="letakBox">
            <table className="table">
                <thead>
                <tr>
                    <th></th>
                    <th><iconify-icon icon="ant-design:arrow-down-outlined"></iconify-icon></th>
                    <th><iconify-icon icon="akar-icons:arrow-up"></iconify-icon></th>
                    <th><iconify-icon icon="akar-icons:arrow-up-down"></iconify-icon></th>
                </tr>
                </thead>
                <tbody>
                {table}
                </tbody>
                <tfoot>
                <tr>
                    <th>Zbroj</th>
                    <td className="zbrojDolje">{props.ukupno[0]}</td>
                    <td className="zbrojGore">{props.ukupno[1]}</td>
                    <td className="zbroj">{props.ukupno[2]}</td>
                </tr>
                </tfoot>
                
                
            </table>
            
        </div>
    )
}