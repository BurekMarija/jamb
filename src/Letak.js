import React from "react"

export default function Letak(props){
    const poljeBrojeva=[]
    for(let i=1; i<7; i++){
        poljeBrojeva.push(<div className="broj">{i}</div>)
    }


    function napraviInput(index){
        
        let element= <td><input 
        key={index}
        onClick={()=>props.upisi(props.rezultati[index].ozn, index)} 
        className={props.rezultati[index].ozn} type="number" 
        value={props.rezultati[index].value} /></td>
        
        return element
    }

    function generirajLetak(){
        let broj=0
        let index=0
        let elementi=[]
        let tabelaElementi=[]
        const red=["1","2","3","4","5","6","Min","Max","Tris","Skala","Full","Poker","Jamb"]
        for(let i=0; i<52; i++){
            
            if(i%4===0){
                elementi.push(<th>{red[broj]}</th>)
                broj=broj+1
            }
            else{
                elementi.push(napraviInput(index))
                index=index+1
            }
        }
        for(let i=0; i<13; i++)
        {   
            tabelaElementi.push(<tr>{elementi[(4*i)+0]}{elementi[(i*4)+1]}{elementi[(i*4)+2]}{elementi[(i*4)+3]}</tr>)
        }

        return tabelaElementi
    }


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
                {generirajLetak()}
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