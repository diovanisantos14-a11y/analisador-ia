# Analisador IA — Estúdio de ideias

Aplicação web em português para organizar referências do TikTok e planejar vídeos de IA. Sem dependências externas, cadastro ou chave de API.

## Executar

Requer Node.js 22 ou superior. Na pasta do repositório:

```sh
npm start
```

**Start command: `npm start`**. Porta padrão: **3000**. A hospedagem pode definir `PORT` e, opcionalmente, `HOST` (padrão `0.0.0.0`). Não é necessário `npm install`: o servidor usa apenas módulos nativos do Node.js.

```sh
npm run dev
npm test
```

## Funcionalidades

- Salvar links de vídeos e links curtos oficiais do TikTok, removendo rastreamento.
- Organizar por título, categoria, anotações e etapa de produção; buscar e excluir.
- Exportar e importar backups JSON, preservando referências existentes e evitando duplicações.
- Gerar ideias por tema, estilo e duração, com quatro âncoras propostas e movimentos de animação.
- Baixar o roteiro em texto.

## Dados e limites

As referências ficam no `localStorage` do navegador, por origem. Não são enviadas ao servidor nem sincronizadas entre dispositivos. Limpar o navegador pode apagá-las: exporte backups. Roteiros precisam ser baixados para serem preservados.

O gerador usa modelos textuais locais com variações de premissa; **não está conectado a um modelo de IA**. Os resultados são propostas para revisão humana.

Esta versão **não baixa, assiste, transcreve nem analisa vídeos do TikTok**. As quatro âncoras são uma proposta para uma nova produção, não uma contagem de imagens de um vídeo existente. Análise audiovisual e integração com provedores de IA exigem implementação adicional e acesso permitido à mídia.

## Hospedagem

Use uma hospedagem Node.js 22+ com comando `npm start`, sem etapa de build. Configure HTTPS no provedor ou proxy reverso para acesso público. O servidor serve apenas a pasta `public`, sem API de escrita. Não há autenticação; os dados são locais por navegador. Recursos de armazenamento e geração de IDs exigem um contexto seguro (HTTPS ou localhost).
