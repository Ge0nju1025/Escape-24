export const names=['민수','지은','준호'];
export const rules=['소지품을 가지러 다시 들어가지 않아요.','도움이 필요한 친구의 위치를 교사에게 알려요.','차단된 통로를 피하고 집결지에서 인원을 보고해요.'];
export const sources=['https://www.usfa.fema.gov/gallery/pictographs/escape-planning.html','https://www.ready.marines.mil/Stay-Informed/Technological-Hazards/Home-Fires/'];
export const W=30,H=20;
export const grid=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>x===0||y===0||x===W-1||y===H-1|| (y===8&&![5,14,24].includes(x))||(x===19&&y<8)||(y===13&&x>7&&x<25)||(y===5&&[4,5,8,9,12,13].includes(x))?1:0));
export function walk(x:number,y:number){return grid[y]?.[x]===0;}
export function path(start:number[],end:number[]){const q=[start],prev=new Map<string,number[]|null>([[start.join(),null]]);for(let i=0;i<q.length;i++){const p=q[i];if(p.join()===end.join()){const out:number[][]=[];let c:number[]|null=p;while(c){out.unshift(c);c=prev.get(c.join())!;}return out.slice(1);}for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const n=[p[0]+dx,p[1]+dy];if(walk(...n as [number,number])&&!prev.has(n.join())){prev.set(n.join(),p);q.push(n);}}}return [];}
export function score(safe:number,reported:boolean,unsafe:number){return [Math.max(0,40-unsafe*10),safe?25:0,Math.round(safe/3*20),reported?15:0];}
