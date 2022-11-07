import React from "react";

export default function Pravila(){
    return(
        <div className="pravila">
            <h3>Pravila</h3>
            <p>Potrebno je poštivati redosljed upisivanja u kolone</p>
            <p>U polja označena brojevima upisuje se vrijednost zbroja tog broja sakupljena u 3 bacanja.</p>
            <p>U kolonu min i max upisuje se zbroj rezultata za svaku kategoriju. Min zbroj se oduzima od max</p>
            <p>Tris: 3 iste kockice (zbroj+10)</p>
            <p>Skala: Mala skala 30 bodova, Velika skala 40 bodova</p>
            <p>Full:3 iste jedne vrijednosti, 2 iste druge vrijednosti (zbroj+30)</p>
            <p>Poker: 4 iste vrijednosti (zbroj+40)</p>
            <p>Jamb: Sve iste vrijednosti (zbroj+50)</p>
        </div>
    )

}