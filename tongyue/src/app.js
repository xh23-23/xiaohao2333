const $ = selector => document.querySelector(selector);
const manifest = await fetch('selected.json').then(r => { if (!r.ok) throw new Error('页面目录加载失败'); return r.json(); });
const titles = {H03:'首页',L04:'发现企业',D02:'企业详情 · 概览',P01:'企业对比',P02:'资金使用 · 统一淡化版',P03:'资金使用 · 轻玻璃',P04:'基金募资进度',P05:'我的报告 · 空状态',P06:'我的',P07:'偏好与资料设置',P08:'资料来源',P09:'企业动态',P10:'历史对话',P11:'对话',P12:'筛选企业'};
const pages = manifest.map(item => ({...item,title:titles[item.id] || item.title, file:`assets/${item.id}.png`}));
const ids = new Set(pages.map(p => p.id));
const groups = [ ['主页面',['H03','L04','D02','P01']],['资金',['P02','P03','P04','S09']],['企业资料',['S01','S02','S03','S04','S05','S06','S07','S08','S14','P12']],['报告与个人',['P05','S10','S11','S12','S13','P06','P07','P08','P09','P10','P11']],['状态设计',['S15','S16','S17']] ];
const related = {
 H03:['L04','S14','P03','P06'],L04:['D02','P12','S14','S13'],D02:['S01','S08','S10','P01'],P01:['S14','D02'],P02:['P04','S09'],P03:['P04','S09'],P04:['P03','S09'],P05:['S11','S10'],P06:['S13','S11','P07','P08'],P07:['P08','S15','S17','P06'],P08:['L04','P07'],P09:['L04','D02'],P10:['P11','D02'],P11:['D02','P10'],P12:['L04','S17'],S08:['D02','S10'],S09:['P03','P04'],S10:['S16','S11'],S11:['S12','P05'],S12:['S11','S10'],S13:['L04','P06'],S14:['P01','L04'],S15:['P07'],S16:['S11','S12'],S17:['L04','P07']
};
for(let i=1;i<=7;i++) related[`S0${i}`]=['D02',...Array.from({length:7},(_,j)=>`S0${j+1}`).filter(x=>x!==`S0${i}`),'S08'];
const descriptions = {
 H03:'采用 H03：淡蓝紫背景与干净白卡。保留顶部与底部左侧通约彩色 Logo。',L04:'采用 L04：更紧凑的企业卡片，三列指标对齐，关注与选择对比入口清晰。',D02:'采用 D02：背景减淡，保留白色资料卡与明确的研究入口。',P01:'对比表采用统一白底与细分隔线，避免零散色块。',P02:'资金使用页已统一应用你确认的淡化玻璃卡片。P02、P03 保留两个目录编号，展示同一最新样式。',P03:'蓝紫底色、高光与阴影减淡；卡片保留轻微的磨砂透光感。可切换募资进度。',P04:'与资金使用共用淡化后的资金汇总卡，继续保留白色数据卡和清晰的进度条。',S15:'连接中、连接失败、连接成功的状态设计板。此处展示完整原稿。',S16:'报告生成中、生成失败、生成完成的状态设计板。此处展示完整原稿。',S17:'查询无结果、加载中、加载失败、CSV 导入失败的状态设计板。此处展示完整原稿。'
};
const link = (id,label) => `<a class="related-link" href="#${id}">${label || pages.find(x=>x.id===id)?.title || id}<span aria-hidden="true">↗</span></a>`;
$('#page-list').innerHTML = groups.map(([label,list]) => `<div class="group-label">${label}</div>${list.map(id=>`<a class="page-item" href="#${id}" data-page="${id}"><span>${id}</span>${pages.find(x=>x.id===id).title}</a>`).join('')}`).join('');
const iconPaths = {
 back:'<path d="m15 5-7 7 7 7"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 star:'<path d="m12 3 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3L12 17.4 6.4 20.4l1.1-6.3L3 9.6l6.2-.9Z"/>',
 compare:'<rect x="3" y="4" width="7" height="16" rx="1"/><rect x="14" y="4" width="7" height="16" rx="1"/><path d="M5 8h3M5 12h3m8-4h3m-3 4h3"/>',
 doc:'<path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h4M9 12h6m-6 4h6"/>',
 sparkle:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/>',
 history:'<path d="M3 11a9 9 0 1 1 1 6M3 4v7h7m2-5v6l4 3"/>',
 people:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3Zm13-17a3 3 0 0 1 0 6m2 5a5 5 0 0 1 3 5"/>',
 handshake:'<path d="m3 7 4-3 5 3 5-3 4 4-5 11-4 2-9-8Zm4 5 5-5 4 3-3 4-3-1m0 4 4 3M2 13l3 3m13-2 3-3"/>',
 filter:'<path d="M3 6h18M3 12h18M3 18h18"/><circle cx="8" cy="6" r="2" fill="white"/><circle cx="16" cy="12" r="2" fill="white"/><circle cx="10" cy="18" r="2" fill="white"/>',
 send:'<path d="m3 3 18 9-18 9 4-9Zm4 9h14"/>',
 message:'<path d="M3 4h18v13H9l-6 4Zm4 5h10M7 13h6"/>',
 plus:'<circle cx="12" cy="12" r="9"/><path d="M7 12h10m-5-5v10"/>',
 swap:'<path d="M3 7h17l-4-4M21 17H4l4 4"/>',
 close:'<path d="m5 5 14 14M5 19 19 5"/>',
 attach:'<path d="m8 13 7-7a3 3 0 0 1 4 4l-9 9a5 5 0 0 1-7-7L13 2m-3 13 7-7"/>',
 warning:'<circle cx="12" cy="12" r="9"/><path d="M12 6v7m0 4h.01"/>',
 check:'<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
 building:'<path d="M3 21h18M5 21V5l10-3v19m0-12 5 2v10M8 8h3M8 12h3M8 16h3"/>',
 chart:'<rect x="3" y="13" width="4" height="8" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12a2 2 0 0 0 4 0"/>',
 arrow:'<path d="m9 5 7 7-7 7"/>', wifi:'<path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0m-9 4a5 5 0 0 1 6 0"/><circle cx="12" cy="20" r="1"/>', signal:'<path d="M3 20v-4m6 4V12m6 8V8m6 12V3" stroke-width="3"/>'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || ''}</svg>`;
const logo = () => '<svg class="logo" viewBox="0 0 56 52" role="img" aria-label="通约"><path d="M28 2H38V27C38 39 29 47 17 43 7 40 1 32 2 22 3 10 13 2 28 2Z" fill="#00ADF0"/><path d="M28 12C43 9 54 20 54 33S44 52 32 50H17V33C17 21 20 15 28 12Z" fill="#8B66FF"/><path d="M28 12c4-1 7-1 10 0v15c0 11-8 18-18 17l-3-1V33c0-12 3-18 11-21Z" fill="#72B8F5"/></svg>';
const progress = width => `<div class="progress-track" role="img" aria-label="${width}%"><span style="width:${width}%"></span></div>`;
function fundSummary(){return `<section class="fund-summary" aria-label="高新产业一期资金汇总"><div class="fund-name"><strong>高新产业一期</strong><span>/ 人民币基金</span></div><dl class="fund-total"><dt>累计实缴</dt><dd>6.00 亿元</dd></dl><dl class="fund-metrics"><div><dt>目标规模</dt><dd>10 亿</dd></div><div><dt>认缴规模</dt><dd>8 亿</dd></div><div><dt>待实缴</dt><dd>2 亿</dd></div></dl></section>`;}
function fundPage(raise){
 const use = `<section class="fund-card"><h2>资金去向</h2><p>以实缴 6 亿元为基准</p><div class="stack-bar" role="img" aria-label="已投 70%，待划付 13.3%，可用 16.7%"><span>70%</span><span>13.3%</span><span>16.7%</span></div><div class="legend"><span><i></i>已投 4.2 亿</span><span><i></i>待划付 0.8 亿</span><span><i></i>可用 1.0 亿</span></div><p class="card-foot">已投占实缴 70%。</p></section><section class="fund-card"><h2>项目资金分配</h2>${[['远川机器人','机器人','38.1','1.6',100],['澄芯半导体','集成电路','28.6','1.2',75],['新衡能源','新能源','19.0','0.8',50],['沐川医疗','医疗健康','14.3','0.6',37.5]].map(([name,sector,percent,amount,width])=>`<a class="project-row" ${name==='远川机器人'?'href="#S09"':'aria-disabled="true"'} aria-label="${name==='远川机器人'?'查看':''}${name}资金分配${name==='远川机器人'?'明细':''}"><div class="project-top"><strong>${name}</strong><b>${amount} 亿 ${icon('arrow')}</b></div><div class="project-sub">${sector} · 占已投 ${percent}%</div>${progress(width)}</a>`).join('')}</section>`;
 const raiseHtml = `<section class="fund-card"><h2>募资进度概览</h2>${[['认缴完成率','认缴 8 亿 / 目标 10 亿',80],['实缴到账率','实缴 6 亿 / 认缴 8 亿',75]].map(([title,sub,percent])=>`<div class="fund-progress-row"><div class="project-top"><strong>${title}</strong><b>${percent}%</b></div><p class="project-sub">${sub}</p>${progress(percent)}</div>`).join('')}</section><section class="fund-card"><h2>出资人实缴进度<span class="fund-heading-right">单位：亿元</span></h2>${[['高新产业引导基金','认缴 4 亿 · 实缴 3 亿 · 待实缴 1 亿'],['产业合作方','认缴 2 亿 · 实缴 1.5 亿 · 待实缴 0.5 亿'],['其他出资人','认缴 2 亿 · 实缴 1.5 亿 · 待实缴 0.5 亿']].map(([name,sub])=>`<div class="fund-progress-row"><div class="project-top"><strong>${name}</strong><b>75%</b></div><p class="project-sub">${sub}</p>${progress(75)}</div>`).join('')}<p class="card-foot">到账率 = 实缴金额 / 认缴金额</p></section>`;
 return `<div class="fund-screen"><div class="status-bar"><span>9:41</span><div class="status-icons">${icon('signal')}${icon('wifi')}<span class="battery"></span></div></div><header class="app-header"><a href="#H03" aria-label="通约首页">${logo()}</a><h2>通约</h2><span class="divider"></span><h2>资金</h2><span class="header-spacer"></span><a class="icon-btn" href="#P09" aria-label="查看动态">${icon('bell')}</a><a class="avatar" href="#P06" aria-label="我的工作空间">林</a></header><div class="fund-heading"><h1>资金全景</h1><span class="demo-tag">演示账目</span></div>${fundSummary()}<nav class="fund-tabs" aria-label="资金栏目"><a href="#P03" class="${raise?'':'active'}" ${raise?'':'aria-current="page"'}>资金使用</a><a href="#P04" class="${raise?'active':''}" ${raise?'aria-current="page"':''}>募资进度</a></nav>${raise?raiseHtml:use}<p class="fund-disclaimer">独立演示账目，与园区企业名录无关联。${raise?'':'已投、待划付与可用合计为实缴资金。'}</p><nav class="fund-nav" aria-label="主导航"><a href="#H03">${logo()}通约</a><a href="#L04">${icon('building')}企业</a><a href="#P03" class="active" aria-current="page">${icon('chart')}资金</a></nav><div class="home-indicator"></div></div>`;
}
// Hotspot coordinates use percentages of each unchanged design image.
// Every page is also reachable through the persistent directory.
const spot = (to,label,x,y,w,h) => ({to,label,x,y,w,h});
const back = (to='H03') => spot(to,'返回',2,4,9,5);
const profile = () => spot('P06','我的工作空间',87,4.5,10,4.5);
const bottom = (y=91) => [spot('H03','通约首页',8,y,21,7),spot('L04','发现企业',40,y,21,7),spot('P03','资金全景',73,y,21,7)];
const detailTabs = y => [spot('D02','概览',5,y,28,4),spot('S01','企业资料',35,y,29,4),spot('S08','企业跟进',68,y,27,4)];
const hotspots = {
 H03:[spot('P10','历史记录',66,4,8,5),spot('P09','动态',77,4,8,5),profile(),spot('L04','搜索企业',4,18.5,92,5),spot('L04','发现企业',4,25,44,13),spot('S14','企业对比',51,25,45,13),spot('P03','资金全景',4,39,92,7),spot('S08','企业走访',5,47.5,29,5),spot('P11','融资接洽',35,47.5,29,5),spot('P05','我的报告',66,47.5,29,5),spot('P09','关注动态',75,55,21,3),spot('L04','添加关注',39,68,22,3.5),spot('P07','调整关注方向',83,73,14,3.5),spot('P11','问通约',5,85.5,57,5),spot('P07','本地资料',63,85.5,22,5),...bottom(92)],
 L04:[profile(),spot('P09','动态',77,4,8,5),spot('S17','搜索状态',4,16,92,4),spot('P08','资料范围',75,21.5,21,3.5),spot('S13','我的关注',20,26,21,4),spot('S11','报告',41,26,18,4),spot('P12','筛选企业',78,25.5,18,4),spot('S14','选择对比',71,31,25,4),spot('D02','企业详情',6,36,72,7),spot('D02','企业详情示例',6,55,72,7),spot('D02','企业详情示例',6,71,72,7),...bottom(92)],
 D02:[back('L04'),spot('S13','关注企业',5,19.7,29,4),spot('S14','加入对比',36,19.7,31,4),...detailTabs(25.3),spot('S01','查看资料',76,32,20,4),spot('S08','查看研究记录',71,58.5,25,4),spot('P11','准备沟通提纲',5,76,35,4),spot('S10','研究这家公司',4,84.5,92,5),...bottom(92)],
 P01:[back('S14'),spot('S14','更换对比企业',65,9,30,5)],
 P05:[back(),profile(),spot('L04','发现企业',29,48,42,7),spot('S11','查看报告有内容状态',5,15,90,5)],
 P06:[back(),profile(),spot('S13','我的关注',5,21,28,9),spot('S11','研究报告',35,21,28,9),spot('P07','关注方向',67,21,28,9),spot('S13','我的关注',4,33,92,7),spot('S11','研究报告',4,40,92,6),spot('P07','偏好与资料设置',4,46,92,7),spot('P08','企业资料范围',4,53,92,7)],
 P07:[spot('P06','关闭设置',89,17,8,5),spot('S17','导入状态',75,65,21,5),spot('P08','查看企业资料覆盖',4,72,92,5),spot('S15','连接平台 AI 状态',5,85,30,4),spot('P06','完成',4,92,92,5)],
 P08:[back('P06'),spot('L04','查看企业',5,86,90,6)],
 P09:[back(),profile(),spot('D02','企业详情',5,24,90,18),...bottom(92)],
 P10:[back(),profile(),spot('P11','打开历史对话',5,20,90,10)],
 P11:[back('P10'),profile(),spot('D02','查看企业',5,30,90,18),spot('P07','本地资料设置',62,89,22,5)],
 P12:[spot('L04','关闭筛选',88,29,9,5),spot('L04','重置筛选',5,92,25,5),spot('L04','应用筛选',34,92,62,5)],
 S08:[back('D02'),profile(),...detailTabs(25.3),spot('S10','研究这家公司',4,89,92,6)],
 S09:[back('P03')],S10:[spot('D02','关闭',89,38,8,5),spot('S16','查看报告生成状态',4,90,92,7)],
 S11:[back(),profile(),spot('S12','打开报告',4,22,92,18)],S12:[back('S11'),profile(),spot('S11','返回报告列表',4,91,30,5)],
 S13:[back('L04'),profile(),spot('L04','发现企业',25,44,50,10),...bottom(92)],
 S14:[back('L04'),profile(),spot('P01','开始对比',4,87,92,8)],
 S15:[spot('P07','返回设置',1,1,98,5)],S16:[spot('S11','查看报告列表',1,92,98,6)],S17:[spot('L04','返回企业列表',1,92,98,6)]
};
for(let i=1;i<=7;i++) hotspots[`S0${i}`]=[back('D02'),profile(),...detailTabs(27),...Array.from({length:7},(_,j)=>spot(`S0${j+1}`,['基础与产品','融资','知识产权','客户','招投标','人员','经营'][j],j===0?4:25+(j-1)*12.2,33,j===0?20:12,3.5)),spot('S10','研究这家公司',4,91,92,5)];
let current='H03';
function toast(message){document.querySelector('.ui-toast')?.remove();const el=document.createElement('div');el.className='ui-toast';el.setAttribute('role','status');el.textContent=message;document.body.append(el);setTimeout(()=>el.remove(),3500);}
function bindProductControls(root){
 root.querySelectorAll('[data-search]').forEach(form=>form.onsubmit=e=>{e.preventDefault();location.hash=form.q.value.trim()?'S17':'L04';});
 root.querySelectorAll('[data-follow]').forEach(button=>{const key='tongyue-follow-'+button.dataset.follow;const set=on=>{button.setAttribute('aria-pressed',String(on));const span=button.querySelector('span');if(span)span.textContent=on?'已关注':button.closest('.ui-actions')?'关注企业':'关注';};set(localStorage.getItem(key)==='true');button.onclick=()=>{const on=button.getAttribute('aria-pressed')!=='true';localStorage.setItem(key,String(on));set(on);toast(on?'已关注':'已取消关注');};});
 const notes=root.querySelector('[data-note]');if(notes){const input=notes.querySelector('textarea');input.value=localStorage.getItem('tongyue-follow-note')||'';notes.onsubmit=e=>{e.preventDefault();localStorage.setItem('tongyue-follow-note',input.value);toast('备注已保存');};}
 root.querySelector('[data-differences]')?.addEventListener('change',e=>root.querySelector('.ui-compare').classList.toggle('differences-only',e.target.checked));
 root.querySelector('[data-filter]')?.addEventListener('submit',e=>{e.preventDefault();location.hash='L04';});
 root.querySelector('[data-preferences]')?.addEventListener('submit',e=>{e.preventDefault();const selected=[...e.target.querySelectorAll('input:checked')].map(x=>x.value);localStorage.setItem('tongyue-preferences',JSON.stringify(selected));toast('设置已保存');location.hash='P06';});
 root.querySelector('[data-generate]')?.addEventListener('submit',e=>{e.preventDefault();location.hash='S16';});
 root.querySelectorAll('[data-chat]').forEach(form=>form.onsubmit=e=>{e.preventDefault();if(current!=='P11')location.hash='P11';else toast('提问流程预览，尚未连接 AI。');});
 root.querySelector('[data-read-all]')?.addEventListener('click',()=>toast('没有未读动态'));
 const tabs=[...root.querySelectorAll('[data-report-tab]')],reportContent=root.querySelector('[data-report-content]');if(tabs.length&&reportContent){const original=reportContent.innerHTML;tabs.forEach(button=>button.onclick=()=>{tabs.forEach(b=>b.setAttribute('aria-selected',String(b===button)));reportContent.innerHTML=current==='S11'&&button.dataset.reportTab==='1'?'<section class="ui-card"><div class="ui-empty"><h2>暂无不跟进的报告</h2></div></section>':original;});}
 root.querySelector('[data-print]')?.addEventListener('click',()=>window.print());
 root.querySelector('[data-download]')?.addEventListener('click',()=>{const content=root.querySelector('.ui-report')?.innerText||'';const url=URL.createObjectURL(new Blob([content],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='成都辛克普雷科技有限公司-研究报告.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 root.querySelector('[data-share]')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(location.href);toast('报告链接已复制');}catch{toast('可复制浏览器地址分享此预览');}});
}
function render(){
 const requested=decodeURIComponent(location.hash.slice(1));current=ids.has(requested)?requested:'H03';
 const page=pages.find(x=>x.id===current),fund=['P02','P03','P04'].includes(current),wide=['S15','S16','S17'].includes(current);
 $('#page-id').textContent=current;$('#page-title').textContent=page.title;document.title=`${page.title} · 通约设计预览`;
 $('#page-description').textContent=descriptions[current] || '按你选定的稿件展示。通过页面入口或目录继续浏览整套设计。';
 if(!fund)$('#page-description').textContent='保留已选页面的配色和结构，文案已改为网页文字。可直接选择、复制，后续调整无需重做图片。';
 $('#hotspots-toggle').hidden=true;
 $('#related').innerHTML=(related[current]||['H03']).map(id=>link(id)).join('');
 $('#original-link').hidden=fund;$('#original-link').href=page.file;$('#fund-note').hidden=!fund;
 $('#original-link').textContent='查看修改前原稿 ↗';
 const phone=$('#phone');phone.classList.toggle('wide-board',wide);
 if(fund) phone.innerHTML=fundPage(current==='P04');
 else if(window.TongyueCopyPages?.render){phone.innerHTML=window.TongyueCopyPages.render(current,{icon,logo});bindProductControls(phone);}
 else {phone.innerHTML=`<div class="screen-image-wrap"><img class="screen-image" src="${page.file}" alt="${page.title}，已选设计 ${page.id}" decoding="async">${(hotspots[current]||[back()]).map(s=>`<a class="hotspot" href="#${s.to}" aria-label="${s.label}" style="left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%"><span class="hotspot-label">${s.label}</span></a>`).join('')}</div>`;}
 phone.scrollTop=0;phone.scrollLeft=0;
 document.querySelectorAll('.page-item').forEach(a=>{if(a.dataset.page===current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 const index=pages.findIndex(x=>x.id===current);$('#previous').disabled=index===0;$('#next').disabled=index===pages.length-1;
 $('#directory').classList.remove('open');$('#directory-toggle').setAttribute('aria-expanded','false');
 $('#announcer').textContent=`已切换至${page.title}`;
}
$('#previous').onclick=()=>{const i=pages.findIndex(x=>x.id===current);if(i>0)location.hash=pages[i-1].id;};
$('#next').onclick=()=>{const i=pages.findIndex(x=>x.id===current);if(i<pages.length-1)location.hash=pages[i+1].id;};
$('#directory-toggle').onclick=()=>{const open=$('#directory').classList.toggle('open');$('#directory-toggle').setAttribute('aria-expanded',String(open));};
$('#hotspots-toggle').onclick=()=>{const on=document.body.classList.toggle('show-hotspots');$('#hotspots-toggle').setAttribute('aria-pressed',String(on));};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#directory').classList.remove('open');$('#directory-toggle').setAttribute('aria-expanded','false');}});
window.addEventListener('hashchange',render);render();
