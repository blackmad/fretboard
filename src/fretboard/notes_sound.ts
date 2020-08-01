/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import Howl, { HowlCallback, HowlErrorCallback } from 'howler';

const sounds_cache: Record<number, Record<number, Howl.Howl>> = {1:{}, 2:{}, 3:{}, 4:{}, 5:{}, 6:{}};


export const load_fret = (sNum: number, fNum: number, cb: Function) => {
    // console.log({cb})
    if (!sounds_cache[sNum][fNum]) {
        // console.log('loading')
        let sound: Howl.Howl;
        return sound = get_sound(sNum, fNum, () => {
            // console.log('got')
            sounds_cache[sNum][fNum] = sound;
            return (typeof cb === 'function' ? cb() : undefined);
        });
    } else {
        return (typeof cb === 'function' ? cb() : undefined);
    }
};


export const play_fret = (sNum: number, fNum: number, cb: HowlErrorCallback) => {
    const cacheSound = sounds_cache[sNum][fNum];
    if (cacheSound) {
        cacheSound.once('end', cb);
        cacheSound.play();
    } else {
        const sound = get_sound(sNum, fNum, () => {
            sound.once('end', cb);
            sound.play();
        });
        return sounds_cache[sNum][fNum] = sound;
    }
};

export const get_sound = (sNum: number, fNum: number, onload: HowlCallback): Howl.Howl => {
    const audio_file_wav = `./resources/${sNum}string/wav/${fNum}.wav`;
    const audio_file_ogg = `./resources/${sNum}string/ogg/${fNum}.ogg`;
    const audio_file_mp3 = `./resources/${sNum}string/mp3/${fNum}.mp3`;
    return new Howl.Howl({src: [audio_file_ogg, audio_file_mp3, audio_file_wav], onload});
};
