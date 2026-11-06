export const episodes=[
 {title:'멈춰 선 친구',name:'민수',place:'교실',line:'경보 소리가… 진짜 불이 난 거야? 너무 무서워. 어떻게 해야 하지?',goal:'친구를 안심시키고 교사의 안내에 따라 안전하게 대피하도록 설명하세요.',actions:['calm','teacher','evacuate']},
 {title:'친구가 보이지 않아',name:'지은',place:'복도',line:'수빈이가 안 보여. 교실로 다시 가 봐야 할까?',goal:'재진입하지 않고 친구의 마지막 위치를 교사에게 알리세요.',actions:['report','no_return']},
 {title:'가방을 두고 왔어',name:'준호',place:'계단 입구',line:'가방에 중요한 물건이 있어. 잠깐만 가져오면 안 될까?',goal:'소지품보다 안전을 우선하고 재진입하지 않도록 설득하세요.',actions:['no_return','evacuate']},
 {title:'막힌 복도',name:'민수',place:'출입구',line:'평소 가던 복도가 막혀 있어. 어느 쪽으로 가야 해?',goal:'차단된 길을 피하고 교사가 확인한 안전 경로를 따르세요.',actions:['teacher','safe_route']},
 {title:'마지막 보고',name:'지은',place:'집결지',line:'선생님께 무엇을 알려드려야 할까? 수빈이는 마지막으로 교실에 있었어. 지금 위치는 몰라.',goal:'확인된 사실과 확인되지 않은 정보를 구분해 교사에게 보고하세요.',actions:['report','facts']}
];
export const actionNames:Record<string,string>={calm:'침착하게 안심시키기',teacher:'교사의 안내 따르기',evacuate:'안전하게 대피하기',report:'교사에게 상황 보고',no_return:'위험 구역에 재진입하지 않기',safe_route:'확인된 안전 경로 이용',facts:'확인된 사실과 모르는 정보 구분'};
export function decide(ep:number,actions:string[],unsafe:string[]){const missing=episodes[ep].actions.filter(x=>!actions.includes(x));return {ready:!missing.length&&!unsafe.length,missing,unsafe};}
export function mockAnalysis(text:string){const actions:string[]=[];if(/침착|괜찮|진정|안심/.test(text))actions.push('calm');if(/선생|교사/.test(text)&&/안내|따르/.test(text))actions.push('teacher');if(/대피|나가|이동/.test(text))actions.push('evacuate');if(/알리|알려|보고|전달/.test(text))actions.push('report');if(/돌아가지|재진입하지|가지 말|들어가지|안전이 먼저/.test(text))actions.push('no_return');if(/확인.*경로|안전한.*길|안전.*경로/.test(text))actions.push('safe_route');if(/모르|확인되지|마지막|확인한 사실/.test(text))actions.push('facts');return {actions,unsafe:/돌아가자|가지러 가|구하러 가|불을 끄자/.test(text)?['reentry']:[]};}
