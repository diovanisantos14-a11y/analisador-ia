export function normalizeTikTok(value) {
  const url = new URL(value.trim());
  if (url.protocol !== 'https:' || !['tiktok.com', 'www.tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'].includes(url.hostname) || url.username || url.password || url.port) throw new Error('Use um link HTTPS válido do TikTok.');
  if (['tiktok.com', 'www.tiktok.com'].includes(url.hostname) && !/^\/@[^/]+\/video\/\d+\/?$/.test(url.pathname)) throw new Error('Cole o link de um vídeo do TikTok.');
  if (['vm.tiktok.com', 'vt.tiktok.com'].includes(url.hostname) && !/^\/[A-Za-z0-9]+\/?$/.test(url.pathname)) throw new Error('Link curto inválido.');
  url.search = ''; url.hash = '';
  return url.href;
}

export function generateIdea(theme, style, duration, variant = 0) {
  theme = theme.trim();
  if (!theme) throw new Error('Informe um tema para gerar a ideia.');
  const twists = ['uma descoberta muda o destino do protagonista', 'um objeto comum revela um segredo inesperado', 'uma decisão pequena transforma toda a comunidade', 'o suposto rival se torna o aliado decisivo'];
  const twist = twists[variant % twists.length];
  const beats = ['Gancho: apresente um detalhe impossível e uma pergunta visual.', 'Conflito: revele o desejo do protagonista e o obstáculo.', `Virada: ${twist}.`, 'Desfecho: mostre a consequência e encerre com uma pergunta ao público.'];
  const end = Number(duration);
  if (![15, 30, 60].includes(end)) throw new Error('Duração inválida.');
  return `IDEIA ORIGINAL — ${theme}\nEstilo: ${style}\nDuração: ${end}s\nPremissa: Em uma história sobre ${theme}, ${twist}.\n\nSTORYBOARD PROPOSTO — 4 imagens âncora\n` + beats.map((beat, i) => {
    const start = Math.round(i * end / 4), stop = Math.round((i + 1) * end / 4);
    return `\nÂncora ${i + 1} | ${start}–${stop}s\n${beat}\nImagem: composição vertical 9:16, estética ${style}, tema ${theme}; manter personagem, roupa e paleta consistentes. ${['Plano fechado no elemento misterioso', 'Plano médio do personagem diante do obstáculo', 'Plano aberto revelando a descoberta', 'Plano final com reação e consequência'][i]}.\nAnimação: ${['aproximação lenta e movimento sutil', 'deslocamento lateral suave', 'revelação gradual com recuo de câmera', 'câmera estável e expressão sutil'][i]}.\nÁudio: escrever uma frase curta para esta ação e revisar a duração na montagem.`;
  }).join('\n') + '\n\nPRODUÇÃO\nCriar as quatro imagens → animar cada imagem → gravar narração → montar e legendar. Esta é uma proposta de criação, não uma análise de vídeo existente.';
}
