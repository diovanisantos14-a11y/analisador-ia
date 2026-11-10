# Ferramentas de análise YouTube — integração inicial

Esta pasta é uma **integração opcional**, separada da aplicação Node.js existente. Não altera o servidor nem o estúdio TikTok.

## Instalação (Python 3.11+)

```bash
python -m venv .venv
# Windows PowerShell:
.venv\\Scripts\\Activate.ps1
pip install -r youtube-tools/requirements.txt
python youtube-tools/analyze.py "https://www.youtube.com/watch?v=ID"
python youtube-tools/analyze.py "https://www.youtube.com/watch?v=ID" --video "video.mp4"
```

O script consulta metadados públicos com yt-dlp. Com `--video`, detecta cortes e cenas usando PySceneDetect. Não baixa vídeos automaticamente e não promete acesso a vídeos privados ou bloqueados.

## Cinco projetos de referência para integração futura

- [PySceneDetect](https://github.com/Breakthrough/PySceneDetect): detecção de cenas — **integrado no script**.
- [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api): transcrições — **dependência preparada**, integração pendente.
- [youtube-toolkit](https://github.com/rytho-ai/youtube-toolkit): avaliar compatibilidade/licença antes de integrar.
- [Creatorscope](https://github.com/sasank-in/yt-analytics-hub): avaliar arquitetura e manutenção antes de integrar.
- [analyze-youtube-channel](https://github.com/HiroItozzz/analyze-youtube-channel): avaliar compatibilidade e manutenção antes de integrar.

Esses cinco repositórios **não foram instalados como aplicações completas**. São projetos independentes, possivelmente com requisitos e serviços próprios. A primeira versão funcional usa yt-dlp e PySceneDetect; a lista acima é o plano de integração. Para analisar canais inteiros, implementar coleta paginada e tratamento de limites de acesso. Para transcrições, verificar disponibilidade e permissões. Métricas privadas como CTR e retenção não podem ser inferidas de dados públicos.

## Próximos passos para o Codex

1. Ler `README.md`, `server.js` e arquivos em `public/` antes de alterar a interface.
2. Criar uma tela de análise de vídeos e canais YouTube sem quebrar o organizador TikTok.
3. Integrar a API de transcrições com tratamento de erros, idioma alemão e indisponibilidade.
4. Criar relatórios comparativos de vídeos, títulos, miniaturas, ritmo visual e roteiro, distinguindo fatos de hipóteses.
5. Avaliar os três repositórios adicionais, suas licenças e dependências, antes de incorporar código.
6. Adicionar testes e instruções de execução; nunca expor chaves de API no frontend.
