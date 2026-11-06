import {test} from 'node:test';import assert from 'node:assert/strict';import {Puzzle,route} from '../src/puzzle';
const run=(p:Puzzle,s:number)=>{for(let i=0;i<s*10;i++)p.update(.1);};
test('automatic movement and pause',()=>{const p=new Puzzle();run(p,1);assert.ok(p.students[0].x>100);p.paused=true;const x=p.students[0].x;run(p,5);assert.equal(p.students[0].x,x);});
test('group spreads instructions and personality changes response',()=>{const p=new Puzzle();p.command(0,'group');assert.ok(p.students.filter(n=>n.guided).length>=2);assert.equal(p.students[1].state,'WAITING');assert.equal(p.orders,8);p.talk(1,40,10,-15,'join_group');assert.ok(p.students[1].guided);});
test('blocked route uses lower floor',()=>{assert.deepEqual(route(1,true),[4,5,6,7]);});
test('free teacher support can complete entire stage with zero resources',()=>{const p=new Puzzle();p.orders=0;for(let i=0;i<6;i++)p.command(i,'report');run(p,120);assert.equal(p.safe,6);p.command(0,'report');assert.equal(p.done,true);assert.equal(p.result().parts[3],15);});
test('group and dialogue strategy evacuates everyone',()=>{const p=new Puzzle();p.command(0,'check');p.command(0,'group');for(const i of [1,2,3])p.talk(i,40,10,-15,'join_group');run(p,120);assert.equal(p.safe,6);});
test('timeout and restart state',()=>{const p=new Puzzle();run(p,301);assert.ok(p.done);assert.equal(new Puzzle().time,300);assert.equal(new Puzzle().safe,0);});
