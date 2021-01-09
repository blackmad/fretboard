/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import React from "react";
import * as _ from 'lodash';

import { emitter } from "./ev_channel";

import { EVENT_SOUNDS_LOADING_START, EVENT_SOUNDS_LOADING_STOP } from "./defs";

type Position = {
  x?: number;
  y?: number;
};

export type SelectorProps = {
  useX?: boolean;
  useY?: boolean;
  minX: number;
  maxX: number;
  onXChange: Function;
  initialPos?: Position;
  loader?: boolean;
  height: number;
  width: number;
};
type MyState = {
  loaderFontSize: number;
  dragging: boolean;
  relx: number;
  pos: Position;
  loader: boolean;
  originalInitialPos: Position;
};

export default class Selector extends React.Component<SelectorProps, MyState> {
  state: MyState = {} as MyState;
  elRef: React.RefObject<HTMLDivElement>;

  componentDidMount() {
    emitter.sub(EVENT_SOUNDS_LOADING_START, this.turnOnLoader);
    return emitter.sub(EVENT_SOUNDS_LOADING_STOP, this.turnOffLoader);
  }

  constructor(props: SelectorProps) {
    super(props);
      
    this.elRef = React.createRef();

    this.state = {
      pos: props.initialPos || {x: 0, y: 0},
      originalInitialPos: props.initialPos || {x: 0, y: 0},
      dragging: false,
      relx: 0,
      loader: !!props.loader,
      loaderFontSize: 20,
    };
  }

  componentWillReceiveProps(newProps: SelectorProps) {
    if (newProps.initialPos && 
      !_.isEqualWith(newProps.initialPos, this.state.originalInitialPos)) {
      this.setState({pos: newProps.initialPos});
    }
  }

  turnOnLoader = () => {
    return this.setState({ loader: true });
  }

  turnOffLoader = () => {
    return this.setState({ loader: false });
  }

  render() {
    return (
      <div
        ref={this.elRef}
        className="col-xs-4 selector"
        style={{
          height: this.props.height,
          width: this.props.width,
          left: `${this.state.pos.x}px`,
          top: `${this.state.pos.y}px`,
          position: "absolute",
        }}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "black",
            textAlign: "center",
            position: "relative",
            opacity: 0.5,
            paddingTop: `${this.props.height / 2 - this.state.loaderFontSize}px`,
            display: this.state.loader ? "block" : "none",
          }}
        >
          <span
            style={{
              opacity: 1,
              color: "white",
              fontSize: `${this.state.loaderFontSize}px`,
              // "textAlign:": "center",
              fontStyle: "italic",
            }}
          >
            loading
          </span>
        </div>
      </div>
    );
  }

  componentDidUpdate(props: SelectorProps, state: MyState) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener("mousemove", this.onMouseMove);
      return document.addEventListener("mouseup", this.onMouseUp as any);
    } else if (!this.state.dragging || !state.dragging) {
      document.removeEventListener("mousemove", this.onMouseMove);
      return document.removeEventListener("mouseup", this.onMouseUp as any);
    }
  }

  onMouseDown = (e: React.MouseEvent | MouseEvent) => {
    if (e.button !== 0) {
      return;
    }
    const left = this.elRef.current?.offsetLeft || 0;
    const relx = e.pageX - left;
    this.setState({ dragging: true, relx });
    e.stopPropagation();
    return e.preventDefault();
  }

  onMouseUp = (e: React.MouseEvent) => {
    this.setState({ dragging: false });
    e.stopPropagation();
    return e.preventDefault();
  }

  onMouseMove = (e: MouseEvent) => {
    if (!this.state.dragging) {
      return;
    }

    const pos = {} as { x: number | undefined };
    const newX = e.pageX - this.state.relx;
    const { minX, maxX, useX } = this.props;

    if (newX >= minX && newX <= maxX) {
      pos.x = newX;
    } else if (newX <= minX) {
      pos.x = minX;
    } else if (newX >= maxX) {
      pos.x = maxX;
    }

    if (typeof this.props.onXChange === "function") {
      this.props.onXChange(pos.x);
    }

    this.setState({ pos });
    e.stopPropagation();
    return e.preventDefault();
  }
}
