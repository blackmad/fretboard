import React from "react";

export type FretData =  {
  checked: boolean;
  playing: boolean;
  selected?: boolean;
  root_note?: boolean;
  is_open?: boolean;
  note: string;
}

const Fret = (props: {
  width: number;
  height: number;
  data: FretData;
}) => {
  let text = "";
  let fretClass = "fret";

  let className = props.data.checked ? "on shadow" : "off";
  if (props.data.checked && props.data.selected) {
    className = "on-selected shadow";
  }

  if (props.data.root_note) {
    className = "on-selected-root shadow";
  }

  if (props.data.checked) {
    text = props.data.note;
  }

  const playClass = props.data.playing ? "playing" : "";

  if (props.data.is_open) {
    if (!props.data.checked) {
      className = `${className} open shadow`;
    }
    text = props.data.note;
    fretClass = "";
  }

  return (
    <div
      className={`col-md-1 ${fretClass} padding0`}
      style={{
        width: props.width,
        height: props.height,
      }}
    >
      <span className="string"></span>
      <span className={`circleBase ${className} ${playClass}`}>{text}</span>
    </div>
  );
};

export default Fret;
