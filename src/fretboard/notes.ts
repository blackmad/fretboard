/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS202: Simplify dynamic range loops
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
let A, Ad, B, C, Cd, D, Dd, E, F, Fd, G, Gd, ref;

export const ALL_NOTES = 
    ["C", "C#", "Db", "D", "D#", "Eb", "E", "Fb", "F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "B", "Cb"];

export const SHARP_NOTES =
  (([C, Cd, D, Dd, E, F, Fd, G, Gd, A, Ad, B] = Array.from(
    (ref = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"])
  )),
  ref);

export const FLAT_NOTES =
  (([C, Cd, D, Dd, E, F, Fd, G, Gd, A, Ad, B] = Array.from(
    (ref = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"])
  )),
  ref);

export type Tuning = {
    name: string,
    notes: string[],
    offset: number[]
}

export const TUNINGS: Record<string, Tuning> = {
  Standard: {
    name: "Standard E",
    notes: [E, B, G, D, A, E],
    offset: [0, 0, 0, 0, 0, 0],
  },

  DropD: {
    name: "Dropped D",
    notes: [E, B, G, D, A, D],
    offset: [0, 0, 0, 0, 0, -2],
  },

  "1StepDown": {
    name: "1 step down",
    notes: [Dd, Ad, Fd, Cd, Gd, Dd],
    offset: [-1, -1, -1, -1, -1, -1],
  },

  DropC: {
    name: "Dropped C",
    notes: [D, A, F, C, G, C],
    offset: [-2, -2, -2, -2, -2, -4],
  },
};

export const get_note_index = (note: string, notes: string[]) => {
  for (let i = 0; i < notes.length; i++) {
    const n = notes[i];
    if (note === n) {
      return i;
    }
  }
  return -1;
};

export const get_new_index = (old_idx: number, notes: string[]) => {
  if (old_idx === notes.length - 1) {
    return 0;
  } else {
    return old_idx + 1;
  }
};

export const getNoteGenerator = (note: string, notes: string[]) => {
  let idx = get_note_index(note, notes);
  let lastNote = '';
  return () => {
    const ret_idx = idx;
    idx = get_new_index(idx, notes);
    const curNote = notes[ret_idx];
    if (!lastNote) {
        lastNote = curNote;
    } else {
        if (lastNote[0] === curNote[0]) {
            console.log('enharmonica');
            // if 
        }
    }
    return curNote;
  };
};

// Concatting because of consistency with tabs format
// to make 1st element of array to be the 1st string
export const generateNotes = (sCount: number, fCount: number, tuning: any, notes: string[]) => {
  const base: string[][] = [[]];
  return base.concat(
    (() => {
      const result = [];
      for (
        let sNum = 0, end = sCount - 1, asc = 0 <= end;
        asc ? sNum <= end : sNum >= end;
        asc ? sNum++ : sNum--
      ) {
        const noteGen = getNoteGenerator(tuning[sNum], notes);
        result.push(__range__(0, fCount, true).map(() => noteGen()));
      }
      return result;
    })()
  );
};

function __range__(left: number, right: number, inclusive: boolean) {
  let range = [];
  let ascending = left < right;
  let end = !inclusive ? right : ascending ? right + 1 : right - 1;
  for (let i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
    range.push(i);
  }
  return range;
}
