/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS201: Simplify complex destructure assignments
 * DS202: Simplify dynamic range loops
 * DS204: Change includes calls to have a more natural evaluation order
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import async from "async";
import React from "react";
import * as _ from "lodash";

import { generateNotes } from "./notes";
import Selector, { SelectorProps } from "./selector";
import { NoteEntry, SCALES } from "./scales";
import { BlFret, blFret } from "./blFret";
import GString from "./GString";

import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStop,
  faRedo,
  faArrowUp,
  faArrowDown,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";

import Howl, { HowlCallback } from "howler";

export const get_sound = (sNum: number, fNum: number, onload: HowlCallback): Howl.Howl => {
  const audio_file_wav = `./resources/${sNum}string/wav/${fNum}.wav`;
  const audio_file_ogg = `./resources/${sNum}string/ogg/${fNum}.ogg`;
  const audio_file_mp3 = `./resources/${sNum}string/mp3/${fNum}.mp3`;
  return new Howl.Howl({ src: [audio_file_ogg, audio_file_mp3, audio_file_wav], onload });
};

const clickHowl = new Howl.Howl({ src: "./resources/cowbell.wav" });
const claveHowl = new Howl.Howl({ src: "./resources/clave.wav" });


function playClick() {
  claveHowl.play();
}

function playIntroClick() {
  clickHowl.play();
}

const getClearFrets = (
  sNum: number,
  fNum: number,
  notesMap: Record<number, Record<number, string>>
) => {
  const frets: Record<number, Record<number, BlFret>> = {};
  for (let i = 1, end = sNum, asc = 1 <= end; asc ? i <= end : i >= end; asc ? i++ : i--) {
    frets[i] = {};
    for (let j = 0, end1 = fNum, asc1 = 0 <= end1; asc1 ? j <= end1 : j >= end1; asc1 ? j++ : j--) {
      frets[i][j] = blFret(i, j, notesMap[i][j], false, false);
    }
  }
  return frets;
};

type Tuning = any;

type MyProps = {
  tuning: Tuning;
  data?: {
    fretsNum: number;
    stringsNum: number;
  };
  selectorFretsCount: number;
  fretWidth: number;
  fretHeight: number;
  Scale: string;
  Note: string;
  bpm: number;
};
type MyState = {
  selectorX: number;
  is_playing: boolean;
  playing_fret?: FretType;
  timeout: number;
  changeDirection: boolean;
  repeat: boolean;
  direction: string;
  originalDirection: string;
  selector: SelectorProps;
  stringsNum: number;
  fretsNum: number;
  selectorFretsCount: number;
};

type FretType = [number, number];

const SelectorPaddingPx = 16;

export default class Guitar extends React.Component<MyProps, MyState> {
  jsGuitarRef: React.RefObject<HTMLDivElement>;
  displayRef: React.RefObject<HTMLHeadingElement>;

  startPlayFret(fret: FretType) {
    return this.setState({ playing_fret: fret });
  }

  playScaleHelper = ({ firstTime }: { firstTime: boolean }): any => {
    const { scale, notes } = SCALES[this.props.Scale].get_notes(this.props.Note);

    const notesMap = generateNotes(
      this.state.stringsNum,
      this.state.fretsNum,
      this.props.tuning.notes,
      notes
    );

    const self = this;
    const play_iterator = (nums: number[], cb: Function) => {
      const [sNum, fNum] = nums;
      const note = notesMap[sNum][fNum];
      const noteEntry: NoteEntry = _.find(scale, (n) => n.name === note);

      console.log(this.state.direction);
      const halfToneOffset =
        this.state.direction === "DOWN"
          ? `+${noteEntry.offset}`
          : `-${noteEntry.offset === 0 ? 0 : 12 - noteEntry.offset}`;

      this.displayRef.current!.innerHTML = `${noteEntry.name} - ${noteEntry.scaleName} ${halfToneOffset}`;

      if (!self.state.is_playing) {
        console.log("not playing anymore so canceling");
        self.setState({ playing_fret: undefined });
        cb("stop");
      } else {
        console.log("doing the thing at ", { sNum, fNum });
        self.startPlayFret([sNum, fNum]);
        playClick();
        setTimeout(cb, (60 * 1000) / this.props.bpm);
      }
    };

    const tabs_to_play = this.get_selected_frets({
      startAtRoot: firstTime
    });
    // if we're repeating, don't play the note we just played again
    if (!firstTime) {
      tabs_to_play.shift();
    }
    // console.log({tabs_to_play});

    return async.mapSeries(tabs_to_play, play_iterator, (err) => {
      if (!self.state.is_playing) {
        return;
      }

      if (self.state.repeat) {
        if (self.state.changeDirection) {
          self.toggleDirection();
        }
        return self.playScale({ intro: false });
      } else {
        return self.setState({ is_playing: false });
      }
    });
  };

  countOff(done: Function) {
    const countInTimes = 4;
    let timesCounted = 0;

    const tabs_to_play = this.get_selected_frets({startAtRoot: true});
    const firstTab = tabs_to_play[0];
    console.log({firstTab})

    const cb = () => {
      if (!this.state.is_playing) {
        return;
      }

      if (timesCounted % 2 === 0) {
        this.setState({ playing_fret: firstTab as FretType });
      } else {
        this.setState({ playing_fret: undefined });
      }

      playIntroClick();
      timesCounted++;
      if (timesCounted === 1) {
        this.displayRef.current!.innerHTML = "Get Ready! " + timesCounted.toString();
      } else {
        this.displayRef.current!.innerHTML = timesCounted.toString();
      }
      if (timesCounted === countInTimes) {
        setTimeout(done, (60 * 1000) / this.props.bpm);
      } else {
        setTimeout(cb, (60 * 1000) / this.props.bpm);
      }
    };

    cb();
  }

  playScale({ intro }: { intro?: boolean }): any {
    console.log("setting playing to true");
    this.setState({ is_playing: true }, () => {
      if (intro) {
        this.setState({originalDirection: this.state.direction })
        this.countOff(() => this.playScaleHelper({ firstTime: true }));
      } else {
        this.playScaleHelper({ firstTime: false });
      }
    });
  }

  stopPlayScale() {
    return this.setState({ 
      direction: this.state.originalDirection,
      is_playing: false
     });
  }

  toggleDirection() {
    if (this.state.direction === "UP") {
      return this.setState({ direction: "DOWN" });
    } else {
      return this.setState({ direction: "UP" });
    }
  }

  get_selected_frets({startAtRoot}: {
    startAtRoot: boolean
  }) {
    const { scale, notes } = SCALES[this.props.Scale].get_notes(this.props.Note);

    const notesMap = generateNotes(
      this.state.stringsNum,
      this.state.fretsNum,
      this.props.tuning.notes,
      notes
    );

    let sNum;
    let string, fret;
    const ret_tabs = [];

    let strings: [BlFret, number][] = (() => {
      const result: [BlFret, number][] = [];
      const object = this.get_frets();
      _.each(object, (string: Record<number, BlFret>, sN) => {
        result.push([string as any, (sN as unknown) as number]);
      });
      return result;
    })();
    if (this.state.direction === "DOWN") {
      strings = strings.reverse();
    }

    let shouldInclude = startAtRoot ? false : true;

    for ([string, sNum] of Array.from(strings)) {
      let fNum;
      let frets: [BlFret, number][] = [];
      _.each(string, (fret, fN) => {
        frets.push([fret as any, (fN as unknown) as number]);
      });

      if (this.state.direction === "UP") {
        frets = frets.reverse();
      }

      for ([fret, fNum] of Array.from(frets)) {
        if (fret.data().selected && fret.data().checked) {
          if (!shouldInclude) {
            const note = notesMap[sNum][fNum];
            const noteEntry: NoteEntry = _.find(scale, (n) => n.name === note);
            if (noteEntry.offset === 0) {
              shouldInclude = true;
            }
          }
          if (shouldInclude) {
            ret_tabs.push([sNum, fNum]);
          }
        }
      }
    }
    return ret_tabs;
  }

  componentDidMount() {
    if (!this.jsGuitarRef.current) {
      return;
    }
    const selectorWidth = this.state.selectorFretsCount * this.props.fretWidth;
    const { selector } = this.state;
    const selectorX = this.jsGuitarRef.current.offsetLeft;
    selector.initialPos = { x: selectorX - 10, y: this.jsGuitarRef.current.offsetTop - SelectorPaddingPx / 2 };
    selector.minX = selectorX - 10;
    selector.maxX = selectorX + (this.state.fretsNum + 1) * this.props.fretWidth - selectorWidth;
    return this.setState({ selector, selectorX });
  }

  constructor(props: MyProps) {
    super(props);
    
    window.onresize = () => {
      this.componentDidMount();
    }

    this.displayRef = React.createRef();

    const stringsNum = (props.data != null ? props.data.stringsNum : undefined) || 6;
    const fretsNum = (props.data != null ? props.data.fretsNum : undefined) || 16;
    const selectorFretsCount = props.selectorFretsCount || 4;
    const timeout = 400;
    let selector = null;
    const is_playing = false;
    const direction = "DOWN";
    const repeat = true;
    const changeDirection = true;
    const selectorWidth = selectorFretsCount * props.fretWidth;
    const playing_fret = undefined;

    this.jsGuitarRef = React.createRef();

    selector = {
      height: stringsNum * props.fretHeight + SelectorPaddingPx,
      width: selectorWidth,
      onXChange: (x: number) => this.onSelectorMove(x),
      minX: 20,
      maxX: -1,
    };

    this.state = {
      stringsNum,
      fretsNum,
      timeout,
      selector,
      is_playing,
      selectorFretsCount,
      direction,
      repeat,
      changeDirection,
      playing_fret,
      selectorX: 0,
      originalDirection: direction
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        this.togglePlayPause();
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }

  onSelectorMove(x: number) {
    return this.setState({ selectorX: x, is_playing: false });
  }

  get_frets = (): Record<number, Record<number, BlFret>> => {
    const { scale, notes } = SCALES[this.props.Scale].get_notes(this.props.Note);

    const notesMap = generateNotes(
      this.state.stringsNum,
      this.state.fretsNum,
      this.props.tuning.notes,
      notes
    );

    const frets = getClearFrets(this.state.stringsNum, this.state.fretsNum, notesMap);
    const selectorWidth = this.state.selectorFretsCount * this.props.fretWidth;

    if (!this.state.selector.initialPos) {
      return frets;
    }

    const x = this.state.selectorX;

    _.each(frets, (string, sN) => {
      for (let fN in string) {
        let needle;
        const fret = string[fN];
        const fret_offset =
          (this.state.selector?.initialPos?.x || 0) +
          ((fN as unknown) as number) * this.props.fretWidth + 10;

        if (fret_offset >= x && fret_offset < x + selectorWidth) {
          fret.select();
        }

        if (fret.data().note === this.props.Note) {
          fret.set_root();
        }

        if (this.state.playing_fret && this.state.is_playing) {
          const [_sN, _fN] = Array.from(this.state.playing_fret);
          if (_sN === ((sN as unknown) as number) && _fN === ((fN as unknown) as number)) {
            fret.playStart();
          }
        }

        if (
          ((needle = fret.data().note),
          Array.from(scale.map((n: NoteEntry) => n.name)).includes(needle))
        ) {
          fret.check();
        }

        if (fN === "0") {
          fret.set_open();
        }
      }
    });

    return frets;
  };

  togglePlayPause = () => {
    this.state.is_playing ? this.stopPlayScale() : this.playScale({ intro: true });
  };

  render() {
    const frets = this.get_frets();

    const StringsList = __range__(0, this.state.stringsNum, true).map((num) => {
      return (
        <GString
          key={`string_item_${num}`}
          data={{
            frets: frets[num],
          }}
          Fwidth={this.props.fretWidth}
          Fheight={this.props.fretHeight}
        />
      );
    });

    const SelectorComp = (() => {
      if (this.state.selector.initialPos) {
        if (this.state.selector) {
          return <Selector {...this.state.selector} />;
        }
      } else {
        return <div></div>;
      }
    })();

    const SingleDotFrets = [3, 5, 7, 9, 15, 17, 19];
    const FretDots = (
      <div className="row" style={{ margin: 0 }}>
        {__range__(0, this.state.fretsNum, true).map((num) => {
          return (
            <div
              key={`fret_dot_${num}`}
              className={`col-md-1 fretdot`}
              style={{
                textAlign: "left",
                width: `${this.props.fretWidth}px`,
                right: "12px",
                fontSize: "x-large",
              }}
            >
              {SingleDotFrets.includes(num) && "•"}
              {num === 12 && "••"}
            </div>
          );
        })}
      </div>
    );

    const FretNumbers = (
      <div className="row" style={{ margin: 0 }}>
        {__range__(0, this.state.fretsNum, true).map((num) => {
          let active = "";
          const x = this.state.selectorX;
          if (x) {
            const selectorWidth = this.state.selectorFretsCount * this.props.fretWidth;
            const fret_offset =
              (this.state.selector.initialPos?.x || 0) + num * this.props.fretWidth;
            if (fret_offset >= x && fret_offset < x + selectorWidth) {
              active = "active-num";
            }
          }
          return (
            <div
              key={`fret_num_${num}`}
              className={`col-md-1 fretnum ${active}`}
              style={{ width: `${this.props.fretWidth}px` }}
            >
              {num}
            </div>
          );
        })}
      </div>
    );

    return (
      <div
        style={{
          width: (this.state.fretsNum + 1) * this.props.fretWidth,
          margin: "auto",
        }}
      >
        <h1
          ref={this.displayRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "100%",
            backgroundColor: "beige",
            padding: "20px",
            fontSize: "xx-large",
            display: this.state.is_playing ? "flex" : "none",
          }}
        >
          xxxx
        </h1>

        <div>
          {FretNumbers}
          {FretDots}
        </div>
        <div className="js-guitar" ref={this.jsGuitarRef}>
          {SelectorComp}

          {StringsList}
          {FretDots}
          {FretNumbers}
        </div>
        <div
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            display: "flex",
            paddingTop: "20px",
          }}
        >
          <Button
            variant="outline-primary"
            className={this.state.is_playing ? "active" : ""}
            onClick={this.togglePlayPause}
          >
            {this.state.is_playing ? (
              <FontAwesomeIcon icon={faStop} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </Button>

          <Button
            variant="outline-primary"
            className={this.state.repeat ? "active" : ""}
            onClick={() => this.setState({ repeat: !this.state.repeat })}
          >
            <FontAwesomeIcon icon={faRedo} />
          </Button>

          <Button
            variant="outline-primary"
            className={this.state.direction === "UP" ? "active" : ""}
            onClick={() => this.toggleDirection()}
          >
            {this.state.direction === "UP" ? (
              <FontAwesomeIcon icon={faArrowDown} />
            ) : (
              <FontAwesomeIcon icon={faArrowUp} />
            )}
          </Button>

          <Button
            variant="outline-primary"
            className={this.state.changeDirection ? "active" : ""}
            onClick={() => this.setState({ changeDirection: !this.state.changeDirection })}
          >
            <FontAwesomeIcon icon={faRandom} />
          </Button>
        </div>
      </div>
    );
  }
}

function __range__(left: number, right: number, inclusive: boolean) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
