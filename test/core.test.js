import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTikTok, generateIdea } from '../public/core.js';
test('normaliza links e remove rastreamento',()=>{
 assert.equal(normalizeTikTok('https://www.tiktok.com/@frutella.ia/video/7693557845463190805?q=x'), 'https://www.tiktok.com/@frutella.ia/video/7693557845463190805');
 assert.equal(normalizeTikTok('https://vm.tiktok.com/Ab123/'),'https://vm.tiktok.com/Ab123/');
});
test('rejeita protocolos, domínios falsos e perfis',()=>{
 for(const url of ['javascript:alert(1)','https://tiktok.com.evil.test/@a/video/123','http://www.tiktok.com/@a/video/123','https://user:pass@www.tiktok.com/@a/video/123','https://www.tiktok.com/@a']) assert.throws(()=>normalizeTikTok(url));
});
test('gera quatro âncoras com cobertura da duração e variações',()=>{
 for(const duration of [15,30,60]) { const result=generateIdea('Frutas na feira','3D',duration); assert.equal((result.match(/Âncora \d/g)||[]).length,4); assert.ok(result.includes(`${duration}s`)); assert.ok(result.includes('não uma análise de vídeo existente')); }
 assert.notEqual(generateIdea('Tema','Humor',30,0),generateIdea('Tema','Humor',30,1));
 assert.throws(()=>generateIdea('','Humor',30)); assert.throws(()=>generateIdea('Tema','Humor',0));
});
