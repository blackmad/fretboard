import React from "react";
import { BlFret } from "./blFret";
import Fret from "./Fret";


const GString = (props: {
  Fwidth: number,
  Fheight: number,
  data: {
    frets: Record<number, BlFret>

  }
}) => {
  let fret;
  const make_fret = (fret: any) =>
    (<Fret
      key={`fret_${fret.data().sNum}${fret.data().fNum}`}
      data={fret.data()}
      width={props.Fwidth}
      height={props.Fheight}
    />);

  const frets = [
    (() => {
      const result = [];
      for (let fNum in props.data.frets) {
        fret = props.data.frets[fNum];
        result.push(make_fret(fret));
      }
      return result;
    })(),
  ];
  return (<div className="row">{frets}</div>);
}

export default GString;