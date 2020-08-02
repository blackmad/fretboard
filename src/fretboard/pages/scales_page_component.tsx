/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import React from "react";
import { SCALES } from "./../scales";
import { ALL_NOTES, TUNINGS } from "./../notes";

import { STEP, hSTEP, BigSTEP } from "./../scales";
import Guitar from "../Guitar";

// import Select from "react-select";
import Select from "react-dropdown-select";

const print_size = (size: number[]) =>
  (() => {
    const result = [];
    for (let s of Array.from(size)) {
      if (s === STEP) {
        result.push("Step");
      } else if (s === hSTEP) {
        result.push("hStep");
      } else if (s === BigSTEP) {
        result.push("BigSTEP");
      } else {
        result.push(`+${s}`);
      }
    }

    return result;
  })().join(" - ");

let tuning;

const notesOptions = ALL_NOTES.map((note) => ({ value: note, label: note }));
const scalesOptions = (() => {
  const result = [];
  for (let scale in SCALES) {
    result.push({ value: scale, label: scale });
  }
  return result;
})();
const tuningOptions = (() => {
  const result1 = [];
  for (tuning in TUNINGS) {
    const v = TUNINGS[tuning];
    result1.push({ value: tuning, label: v.name });
  }
  return result1;
})();

type MyProps = {};
type MyState = {
  tuning: string;
  Note: string;
  Scale: string;
  bpm: number;
};

export default class ScalesPage extends React.Component<MyProps, MyState> {
  state = {
    Note: "C",
    Scale: "Major",
    tuning: "Standard",
    bpm: 80,
  };

  render() {
    const tuningName = TUNINGS[this.state.tuning].name;
    return (
      <div>
        <div>
          <h2 className="text-center">
            {`${this.state.Note} ${this.state.Scale} (${tuningName} tuning)`}
          </h2>

          <p className="text-center text-muted text-bold">
            {print_size(SCALES[this.state.Scale].size)}
          </p>
          <p className="text-center text-bold">
            {`${SCALES[this.state.Scale].get_notes(this.state.Note).scale.map((n: any) => n.name).join(" ")}`}
          </p>
          <div>
            <div style={{ width: "850px", margin: "auto" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  zIndex: 10000,
                  paddingBottom: '20px'
                }}
              >
                <div style={{ width: "100px" }}>
                  <Select
                    options={notesOptions as any}
                    placeholder="note"
                    searchable={false}
                    values={[{value: this.state.Note, label: this.state.Note}]}
                    onChange={(n) => this.setState({ Note: (n as any)[0].value })}
                  />
                </div>
                <div style={{ width: "250px" }}>
                  <Select
                    options={scalesOptions as any}
                    placeholder="scale"
                    searchable={false}
                    values={[{value: this.state.Scale, label: this.state.Scale}]}
                    onChange={(n) => {
                      console.log(n);
                      this.setState({ Scale: (n as any)[0].value });
                    }}
                  />
                </div>

                {/* <div style={{ width: "150px" }}>
                  <Select
                    options={tuningOptions}
                    searchable={false}
                    placeholder="tuning"
                    values={[this.state.tuning]}
                    onChange={(n) => this.setState({ tuning: (n as any).value })}
                  />
                </div> */}

                <input 
                value={this.state.bpm}
                onChange={(e: any) => this.setState({bpm: Number(e!.target.value)})}
                />
              </div>
            </div>
            <Guitar
              bpm={this.state.bpm}
              fretWidth={50}
              fretHeight={30}
              selectorFretsCount={4}
              Note={this.state.Note}
              Scale={this.state.Scale}
              tuning={TUNINGS[this.state.tuning]}
            />
          </div>
        </div>
      </div>
    );
  }
}
