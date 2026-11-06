export const emotions=['neutral','anxious','worried','confused','reassured','determined'] as const;
const ids:Record<string,string>={'민수':'minsu','지은':'jieun','준호':'junho'};
export const characterAssets:Record<string,string>=Object.fromEntries(Object.entries(ids).map(([name,id])=>[name,`/assets/characters/${id}/neutral.png`]));
export function portraitAsset(name:string,emotion:string){return `/assets/characters/${ids[name]||'minsu'}/${(emotions as readonly string[]).includes(emotion)?emotion:'neutral'}.png`;}
export const backgrounds=['classroom','hallway','stairs','entrance','assembly'].map(name=>`/assets/backgrounds/${name}.png`);
export const menuBackground='/assets/backgrounds/menu.png';
