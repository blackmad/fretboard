/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import { get_note_index, get_new_index, SHARP_NOTES, FLAT_NOTES } from "./notes";
import * as _ from 'lodash';
import { notEqual } from "assert";

const BigSTEP = 3;
const STEP = 2;
const hSTEP = 1;

export type NoteEntry = {
  name: string;
  degree: number;
  scaleName: string;
  offset: number;
};

const generate_scale_helper = (notesRef: string[], Note: string, scale: Scale): NoteEntry[] => {
  let idx;
  const scale_notes = [
    {
      name: Note,
      degree: 1,
      scaleName: "Root",
      offset: 0,
    },
  ];
  idx = get_note_index(Note, notesRef);
  let degree = 0;
  let offset = 0;
  return scale_notes.concat(
    (() => {
      const result = [];
      for (let s of Array.from(scale.size)) {
        offset += s;

        if (s === BigSTEP) {
          idx = get_new_index(idx, notesRef);
          idx = get_new_index(idx, notesRef);
          idx = get_new_index(idx, notesRef);
        } else if (s === STEP) {
          idx = get_new_index(idx, notesRef);
          idx = get_new_index(idx, notesRef);
        } else {
          idx = get_new_index(idx, notesRef);
        }
        result.push({
          name: notesRef[idx],
          degree: degree + 2,
          scaleName: scale.names[degree],
          offset,
        });
        degree++;
      }
      return result;
    })()
  );
};

const generate_scale = (Note: string, scale: Scale): {
    notes: string[], scale: NoteEntry[]
 } => {
    const withSharps = generate_scale_helper(SHARP_NOTES, Note, scale);
    const withFlats = generate_scale_helper(FLAT_NOTES, Note, scale);

    function isValidScale(scale: NoteEntry[]) {
        return _.uniq(scale.map((s) => s.name[0])).length === scale.length;
    }

    console.log({Note});

    if (Note.includes('b')) {
        return {scale: withFlats, notes: FLAT_NOTES};
    }
    
    if (Note.includes('#')) {
    return {scale: withSharps, notes: SHARP_NOTES};
    }

    if (!isValidScale(withSharps)) {
        return {scale: withFlats, notes: FLAT_NOTES};
    }

    return {scale: withSharps, notes: SHARP_NOTES};
}

type Scale = {
  desc: string;
  size: number[];
  get_notes: (s: string) => any;
  names: string[];
};

const SCALES: Record<string, Scale> = {
  Major: {
    desc: "Major scale",
    size: [STEP, STEP, hSTEP, STEP, STEP, STEP, hSTEP],
    names: [
      "major 2nd",
      "major 3rd",
      "perfect 4th",
      "perfect 5th",
      "major 6th",
      "major 7th",
      "octave",
    ],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.Major);
    },
  },

  Minor: {
    desc: "Minor scale",
    names: [
      "major 2nd",
      "minor 3rd",
      "perfect 4th",
      "perfect 5th",
      "minor 6th",
      "minor 7th",
      "octave",
    ],
    size: [STEP, hSTEP, STEP, STEP, hSTEP, STEP, STEP],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.Minor);
    },
  },

  Arabic: {
    desc: "Arabic scale",
    names: [],
    size: [hSTEP, BigSTEP, hSTEP, hSTEP, BigSTEP, hSTEP, STEP],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.Arabic);
    },
  },

  Blues: {
    desc: "Blues scale",
    names: [],
    size: [BigSTEP, STEP, hSTEP, hSTEP, BigSTEP, STEP],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.Blues);
    },
  },

  PentatonicMinor: {
    desc: "Pentatonic Minor",
    names: ["minor 3rd", "perfect 4th", "perfect 5th", "minor 7th", "octave"],
    size: [BigSTEP, STEP, STEP, BigSTEP, STEP],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.PentatonicMinor);
    },
  },

  PentatonicMajor: {
    desc: "Pentatonic Major",
    names: ["major 3rd", "perfect 4th", "perfect 5th", "major 7th", "octave"],
    size: [STEP, STEP, BigSTEP, STEP, BigSTEP],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.PentatonicMajor);
    },
  },
};

export { SCALES, generate_scale, STEP, hSTEP, BigSTEP };
