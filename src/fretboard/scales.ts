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
  let idx: number;
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

        _.times(s, () => {
          idx = get_new_index(idx, notesRef);
        });

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
      "Major 2nd",
      "Major 3rd",
      "Perfect 4th",
      "Perfect 5th",
      "Major 6th",
      "Major 7th",
      "Octave",
    ],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.Major);
    },
  },

  Minor: {
    desc: "Minor scale",
    names: [
      "Major 2nd",
      "Minor 3rd",
      "Perfect 4th",
      "Perfect 5th",
      "Minor 6th",
      "Minor 7th",
      "Octave",
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
    names: ["Minor 3rd", "Perfect 4th", "Perfect 5th", "Minor 7th", "Octave"],
    size: [BigSTEP, STEP, STEP, BigSTEP, STEP],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.PentatonicMinor);
    },
  },

  PentatonicMajor: {
    desc: "Pentatonic Major",
    names: ["Major 3rd", "Perfect 4th", "Perfect 5th", "Major 7th", "Octave"],
    size: [STEP, STEP, BigSTEP, STEP, BigSTEP],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.PentatonicMajor);
    },
  },

  MajorArpeggio: {
    desc: "Major Arpeggio",
    names: ["Major 3rd", "Perfect 5th", "Octave"],
    size: [4, 3, 5],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.MajorArpeggio);
    },
  },

  MinorArpeggio: {
    desc: "Minor Arpeggio",
    names: ["Minor 3rd", "Perfect 5th", "Octave"],
    size: [3, 4, 5],
    get_notes(Tonica) {
      return generate_scale(Tonica, SCALES.MinorArpeggio);
    },
  },
};

export { SCALES, generate_scale, STEP, hSTEP, BigSTEP };
