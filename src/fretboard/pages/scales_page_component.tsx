import React from "react";
import * as _ from "lodash";
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
        result.push("W");
      } else if (s === hSTEP) {
        result.push("H");
      } else if (s === BigSTEP) {
        result.push("+3");
      } else {
        result.push(`+${s}`);
      }
    }

    return result;
  })().join(" - ");

const notesOptions = ALL_NOTES.map((note) => ({ value: note, label: note }));
const scalesOptions = (() => {
  const result = [];
  for (let scale in SCALES) {
    result.push({ value: scale, label: SCALES[scale].desc });
  }
  return result;
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

  constructor(props: MyProps) {
    super(props);
    const searchParams = new URLSearchParams(window.location.hash.substring(1));
    this.state = { ...this.state, ...Object.fromEntries(searchParams) };
  }

  setStateAndUrl(mutation: any) {
    this.setState(mutation, () => {
      const params = new URLSearchParams(
        _.mapValues(this.state, (v) => v.toString())
      );
      window.location.hash = params.toString();
    });
  }

  render() {
    return (
      <div>
        <div>
          <h2 className="text-center">
            {`${this.state.Note} ${SCALES[this.state.Scale].desc}`}
            {/* {`(${tuningName} tuning)`} */}
          </h2>

          <p className="text-center text-muted text-bold">
            {print_size(SCALES[this.state.Scale].size)}
          </p>
          <p className="text-center text-bold">
            {`${
              _.dropRight(SCALES[this.state.Scale]
              .get_notes(this.state.Note)
              .scale.map((n: any) => n.name), 1)
              .join(" ")}`}
          </p>
          <div>
            <div style={{ width: "850px", margin: "auto" }}>
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

            <div
              style={{
                width: "100vw",
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                paddingTop: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  zIndex: 10000,
                  paddingBottom: "20px",
                }}
              >
                <div style={{ width: "100px" }}>
                  <Select
                    options={notesOptions as any}
                    placeholder="note"
                    searchable={false}
                    values={[
                      { value: this.state.Note, label: this.state.Note },
                    ]}
                    onChange={(n) =>
                      this.setStateAndUrl({ Note: (n as any)[0].value })
                    }
                  />
                </div>
                <div style={{ width: "250px" }}>
                  <Select
                    options={scalesOptions as any}
                    placeholder="scale"
                    searchable={false}
                    values={[
                      {
                        value: this.state.Scale,
                        label: SCALES[this.state.Scale].desc,
                      },
                    ]}
                    onChange={(n) => {
                      this.setStateAndUrl({ Scale: (n as any)[0].value });
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
                <div style={{ position: "relative" }}>
                  <input
                    className="weirdInput"
                    value={this.state.bpm}
                    onChange={(e: any) =>
                      this.setStateAndUrl({ bpm: Number(e!.target.value) })
                    }
                  />
                  <span className="bpmLabel">bpm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="footer"
          style={{
            color: "darkslategrey",
            width: "100%",
            textAlign: "center",
            position: "absolute",
            bottom: "10px",
            fontSize: "small",
          }}
        >
          A thing by <a href="http://blackmad.com">blackmad</a>, source on{" "}
          <a href="https://github.com/blackmad/fretboard">github</a>
          <br />
          based on work by{" "}
          <a href="https://github.com/AlexMost/fretboard">AlexMost</a>
          <br />
          includes sounds from{" "}
          <a href="https://freesound.org/">freesound.org</a>
        </div>
      </div>
    );
  }
}
