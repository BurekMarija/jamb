import './App.css';
import Letak from './Letak';
import React from "react"
import nextId from "react-id-generator";
import Kockica from './Kockica';
import Pravila from './Pravila';
import Confetti from 'react-confetti'


function App() {
  const [rezultati, setRezultati]= React.useState(postaviPoc)
  const [kockice, setKockice]= React.useState(noveKockice)
  const [brojBac, setBrojBac]=React.useState(1)
  const [ukupno, setUkupno]=React.useState([0,0,0])
  const [pobjeda, setPobjeda]=React.useState(false)
  const [sve, setSve]=React.useState(0)
  const kocke=kockice.map(koc=><Kockica 
    key={koc.id}
    value={koc.value}
    isHeld={koc.isHeld}
    id={koc.id}
    oznaci={oznaci}
  />)
 


//zbrajam kada se promjeni neki rezultat
    React.useEffect(()=> {
      let ukupanZbroj1=0
      let ukupanZbroj2=0
      let ukupanZbroj3=0
      for( let i=0; i<39; i++){
        //sve vrijednosti rezultata zbrojati, osim ako je min onda oduzimamo
        if(i%3===0){ukupanZbroj1=(rezultati[i].ozn).substring(0,3)==="min" ? ukupanZbroj1-(rezultati[i].value) :ukupanZbroj1+Number(rezultati[i].value)}
        if(i%3===1){ukupanZbroj2=(rezultati[i].ozn).substring(0,3)==="min" ? ukupanZbroj2-(rezultati[i].value) :ukupanZbroj2+Number(rezultati[i].value)}
        if(i%3===2){ukupanZbroj3=(rezultati[i].ozn).substring(0,3)==="min" ? ukupanZbroj3-(rezultati[i].value) :ukupanZbroj3+Number(rezultati[i].value)}
      }
      setUkupno([ukupanZbroj1, ukupanZbroj2, ukupanZbroj3])

      //Provjeriti jesu li svi rezultati popunjeni
      //ako jesu završi igru i zapamti rezultat
      const poljeSviRez=[]
      for(let i=0; i<39; i++){
        poljeSviRez.push(rezultati[i].value)
      }
      if((poljeSviRez.filter(x => x === "").length)===0){
        setSve(ukupno[0]+ukupno[1]+ukupno[2])
        if((localStorage.getItem("najbolji"))<sve){localStorage.setItem("najbolji", sve)}
        setPobjeda(true)
        
      }
      
    }, [rezultati])




  function noveKockice(){
    const noveKockice=[]
    for(let i=0; i<5; i++){
      const novaKockica={
        value: (Math.ceil(Math.random() * 6)),
        isHeld: false,
        id: nextId()
      }

      noveKockice.push(novaKockica)
    }
    return noveKockice

  }

  function postaviPoc(){
    const prazni=[]
    const oznake=["1d", "1g", "1", "2d", "2g", "2", "3d", "3g", "3", "4d", "4g", "4",  "5d", "5g", "5", "6d", "6g", "6", "mind", "ming", "min", "maxd", "maxg", "max", "trid", "trig", "tris", "skad", "skag", "ska", "fuld", "fulg", "ful", "pokd", "pokg", "pok", "jambd", "jambg", "jamb"]
    for(let i=0; i<39; i++){
      const rez={value:"",
         ozn:oznake[i]}
      prazni.push(rez)
    }
    return prazni
  }

  function oznaci(id){
    setKockice(prije=>prije.map(ko=>id===ko.id? {...ko, isHeld: !ko.isHeld} : ko))

  }

  function baci(){
    setKockice(prije=>prije.map(ko=> ko.isHeld? ko : {...ko, value:(Math.ceil(Math.random() * 6))}))
    setBrojBac(prije=>prije+1)

  }

  function upisi(ozn, index){
    let prvi=parseInt(ozn.charAt(0))
    let prva3=ozn.substring(0,3)
    
    let zbroj=0

    //brojčano polje
        if(prvi>0)
        {
          for(let i=0; i<5; i++)
          {
            if(kockice[i].value===prvi){ 
              zbroj= zbroj+ prvi
            }
          }
          
        }
        //ako min  ili max
        if(prva3==="min" || prva3==="max"){
          for(let i=0; i<5; i++)
          {
            
              zbroj= zbroj+ kockice[i].value
          
          }
          
        }
          //tris
        if(prva3==="tri"){
          zbroj=zbroj+10
          let ponav=[]
          const vrijednosti=[]
          for(let i=0; i<5; i++){vrijednosti.push(kockice[i].value)}
          //broj ponavljanja svakog broja na kockici
          for(let i=1; i<7; i++){ponav.push(vrijednosti.filter(x => x === i).length)}
          for(let i=0; i<5; i++)
          {
              zbroj= zbroj+ kockice[i].value
          
          }
          if((ponav.filter(x => x > 2).length)===0){
            zbroj=0
          }
        }

          //skala
        if(prva3==="ska"){
          let ponav=[]
          const vrijednosti=[]
          for(let i=0; i<5; i++){vrijednosti.push(kockice[i].value)}
          for(let i=1; i<7; i++){ponav.push(vrijednosti.filter(x => x === i).length)}
          if( ((ponav.filter(x => x ===1).length)===5) && ponav[0]===1 ){zbroj=30}
          if( ((ponav.filter(x => x ===1).length)===5) && ponav[0]===0 ){zbroj=40}
          
        }

        //Full
        if(prva3==="ful"){
          let ponav=[]
          const vrijednosti=[]
          for(let i=0; i<5; i++){vrijednosti.push(kockice[i].value)}
          for(let i=1; i<7; i++){ponav.push(vrijednosti.filter(x => x === i).length)}
          if( ((ponav.filter(x => x ===3).length)===1) && ((ponav.filter(x => x ===2).length)===1) ){
            zbroj=30
            for(let i=0; i<5; i++)
          {
            
              zbroj= zbroj+ kockice[i].value
          
          }}}

           //Poker
        if(prva3==="pok"){
          let ponav=[]
          const vrijednosti=[]
          for(let i=0; i<5; i++){vrijednosti.push(kockice[i].value)}
          for(let i=1; i<7; i++){ponav.push(vrijednosti.filter(x => x === i).length)}
          if ((ponav.filter(x => x ===4).length)===1) {
            zbroj=40
            for(let i=0; i<5; i++)
          {
            
              zbroj= zbroj+ kockice[i].value
          
          }}}

          //JAMB
        if(prva3==="jam"){
          let ponav=[]
          const vrijednosti=[]
          for(let i=0; i<5; i++){vrijednosti.push(kockice[i].value)}
          for(let i=1; i<7; i++){ponav.push(vrijednosti.filter(x => x === i).length)}
          if ((ponav.filter(x => x ===5).length)===1) {
            zbroj=50
            for(let i=0; i<5; i++)
          {
            
              zbroj= zbroj+ kockice[i].value
          
          }}}

    //ako je polje ljevo (ostatak 0)
    //ako polje iznad nije označeno ili ako nije prvo polje, probaj ponovo
    if(index%3===0){
      if((index===0 || rezultati[index-3].value!=="") &&  (rezultati[index].value==="") ){
        setKockice(noveKockice())
        setBrojBac(1)
      setRezultati(prije=>prije.map(rez=>rez.ozn===ozn? {...rez, value:zbroj} : rez))
  
      }

    }

    //ako je polje sredina (ostatak 1)
    //prolje zadnje u nizu ili označeno polje 2 iza toga
    if(index%3===1){
      if((index+1===(rezultati.length)-1 || rezultati[index+3].value!=="") && (rezultati[index].value==="") ){
        setKockice(noveKockice())
        setBrojBac(1)
      setRezultati(prije=>prije.map(rez=>rez.ozn===ozn? {...rez, value:zbroj} : rez))
      }

    }

    //ako je polje desno (ostatak 2)
    if(index%3===2){
      if(rezultati[index].value===""){
        setKockice(noveKockice())
        setBrojBac(1)
      setRezultati(prije=>prije.map(rez=>rez.ozn===ozn? {...rez, value:zbroj} : rez))
      }
  }
   
  }

  function resetiraj(){
    setRezultati(postaviPoc)
    setPobjeda(false)
  }

  return (
    <div className="App">
      {pobjeda===true && <Confetti />}
      {pobjeda===true && <div className='reset'><p>Ukupan zbroj je: {sve}</p>
        <button onClick={resetiraj} className='resetButton'>Resetiraj</button></div>}
      <div className='naslov'><h1>Jamb</h1></div>
      <Letak rezultati={rezultati} ukupno={ukupno} upisi={upisi}/>
      <div className='igra'>
      <div className='kockiceBox'>{kocke}</div>
      {brojBac !==3 && <button onClick={baci} className='baci'>Baci</button>}
       {brojBac>2  && <div className='upozorenje'>Upiši broj u rubriku</div>}
       <Pravila />
      </div>
      <div>Najbolji rezultat je {localStorage.getItem("najbolji")}</div>
    </div>
  );
}

export default App;
