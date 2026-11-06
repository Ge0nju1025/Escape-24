import {test} from 'node:test';import assert from 'node:assert/strict';import {walk,path,score} from '../src/data';
test('walls and blocked corridor are not walkable',()=>{assert.equal(walk(0,3),false);assert.equal(walk(15,13),false);});
test('all students can reach assembly without blocked tiles',()=>{for(const start of [[6,3],[15,10],[24,6]]){const route=path(start,[25,17]);assert.ok(route.length);for(const [x,y] of route)assert.ok(walk(x,y));assert.deepEqual(route.at(-1),[25,17]);}});
test('score uses recorded actions',()=>{assert.equal(score(3,true,0).reduce((a,b)=>a+b),100);assert.equal(score(3,true,2)[0],20);assert.equal(score(0,false,0)[3],0);});
