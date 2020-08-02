export const blFret = (
  sNum: number,
  fNum: number,
  note: string,
  checked: boolean,
  playing: boolean,
  selected?: boolean,
  root_note?: boolean,
  is_open?: boolean,
  next_playing?: boolean
) => {
  if (!checked) {
    checked = false;
  }
  if (!playing) {
    playing = false;
  }
  if (!selected) {
    selected = false;
  }
  if (!root_note) {
    root_note = false;
  }
  if (!is_open) {
    is_open = false;
  }

  return {
    data() {
      return { sNum, fNum, note, checked, playing, selected, root_note, is_open, next_playing };
    },
    playNext() {
      return (next_playing = true);
    },
    playStart() {
      return (playing = true);
    },
    playStop() {
      return (playing = false);
    },
    check() {
      return (checked = true);
    },
    uncheck() {
      return (checked = false);
    },
    select() {
      return (selected = true);
    },
    unselect() {
      return (selected = false);
    },
    set_root() {
      return (root_note = true);
    },
    set_open() {
      return (is_open = true);
    },
  };
};

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
export type BlFret = ReturnType<typeof blFret>;