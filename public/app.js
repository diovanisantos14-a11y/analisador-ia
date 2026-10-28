import { normalizeTikTok, generateIdea } from './core.js';
const $ = id => document.getElementById(id);
const key = 'analisador-ia.v1';
let links = [], output = '', variant = 0;
const notify = text => { $('message').textContent = text; };
function validate(items) {
  if (!Array.isArray(items) || items.length > 2000) throw new Error('Backup inválido ou acima de 2.000 referências.');
  return items.map(item => {
    if (!item || typeof item.title !== 'string' || !item.title.trim() || typeof item.url !== 'string') throw new Error('Referência inválida.');
    return { id: crypto.randomUUID(), url: normalizeTikTok(item.url), title: item.title.slice(0,160), category: String(item.category || '').slice(0,80), notes: String(item.notes || '').slice(0,5000), status: String(item.status || 'Referência').slice(0,80) };
  });
}
try { links = validate(JSON.parse(localStorage.getItem(key) || '[]')); } catch { notify('Falha ao ler armazenamento local. Verifique seus backups.'); }
function save(next) {
  try { localStorage.setItem(key, JSON.stringify(next)); links = next; render(); return true; }
  catch { notify('Armazenamento cheio ou bloqueado. Exporte um backup.'); return false; }
}
function node(tag, text) { const el = document.createElement(tag); el.textContent = text; return el; }
function render() {
  const target = $('links'); target.replaceChildren();
  const q = $('search').value.toLocaleLowerCase();
  const selected = links.filter(item => [item.title,item.category,item.notes,item.status].join(' ').toLocaleLowerCase().includes(q));
  if (!selected.length) target.append(node('p', 'Nenhuma referência encontrada.'));
  for (const item of selected) {
    const article = node('article','');
    article.append(node('h3',item.title),node('p',`${item.category || 'Sem categoria'} · ${item.status}`),node('p',item.notes));
    const a = node('a','Abrir no TikTok ↗'); a.href=item.url; a.target='_blank'; a.rel='noopener noreferrer';
    const remove = node('button','Excluir'); remove.className='secondary';
    remove.onclick=()=>{ if(confirm(`Excluir “${item.title}”?`)) save(links.filter(link=>link.id!==item.id)); };
    const label=node('label','Etapa de produção'); const select=document.createElement('select');
    for(const status of ['Referência','Em planejamento','Em produção','Concluído']) { const option=node('option',status); option.selected=status===item.status; select.append(option); }
    select.onchange=()=>save(links.map(link=>link.id===item.id?{...link,status:select.value}:link));
    label.append(select); article.append(a,remove,label); target.append(article);
  }
}
$('link-form').onsubmit=event=>{
  event.preventDefault();
  try {
    const data=Object.fromEntries(new FormData(event.target)); data.url=normalizeTikTok(data.url); data.title=data.title.trim();
    if(!data.title) throw new Error('Informe um título.');
    if(links.length>=2000) throw new Error('Limite de 2.000 referências.');
    if(links.some(item=>item.url===data.url)) throw new Error('Este link já está salvo.');
    if(save([{...data,id:crypto.randomUUID()},...links])) { event.target.reset(); notify('Referência salva neste navegador.'); }
  } catch(error) { notify(error.message); }
};
$('search').oninput=render;
function download(content,name,type) {
  const url=URL.createObjectURL(new Blob([content],{type})); const a=document.createElement('a'); a.href=url; a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
$('export').onclick=()=>download(JSON.stringify(links,null,2),'referencias-tiktok.json','application/json');
$('import').onchange=async event=>{
  const file=event.target.files[0]; if(!file) return;
  try {
    if(file.size>10*1024*1024) throw new Error('O backup deve ter até 10 MB.');
    const items=validate(JSON.parse(await file.text())); const merged=[...links]; const seen=new Set(links.map(item=>item.url));
    for(const item of items) if(!seen.has(item.url)) { merged.push(item); seen.add(item.url); }
    if(merged.length>2000) throw new Error('A importação excederia 2.000 referências.');
    if(save(merged)) notify('Backup importado; referências existentes preservadas.');
  } catch(error) { notify(`Falha na importação: ${error.message}`); }
  event.target.value='';
};
$('idea-form').onsubmit=event=>{
  event.preventDefault(); const data=Object.fromEntries(new FormData(event.target));
  try { output=generateIdea(data.theme,data.style,data.duration,variant++); $('idea').textContent=output; $('download').disabled=false; }
  catch(error) { notify(error.message); }
};
$('download').onclick=()=>download(output,'roteiro-ia.txt','text/plain;charset=utf-8');
render();
