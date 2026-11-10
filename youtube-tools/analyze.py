"""Análise inicial de vídeos do YouTube. Uso: python analyze.py URL [--video arquivo.mp4]."""
import argparse
import json
from urllib.parse import urlparse
from yt_dlp import YoutubeDL

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("url", help="URL pública de vídeo do YouTube")
    parser.add_argument("--video", help="Arquivo de vídeo local para detectar cenas")
    args = parser.parse_args()
    host = urlparse(args.url).hostname or ""
    if host not in {"youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be"}:
        parser.error("Informe um link do YouTube")
    with YoutubeDL({"quiet": True, "skip_download": True, "no_warnings": True}) as ydl:
        info = ydl.extract_info(args.url, download=False)
    result = {
        "titulo": info.get("title"), "canal": info.get("channel"),
        "duracao_segundos": info.get("duration"),
        "visualizacoes": info.get("view_count"),
        "data_publicacao": info.get("upload_date"),
        "descricao": info.get("description"),
        "miniatura": info.get("thumbnail"),
    }
    if args.video:
        from scenedetect import detect, ContentDetector
        scenes = detect(args.video, ContentDetector())
        result["cenas"] = [
            {"inicio_segundos": round(start.get_seconds(), 2),
             "fim_segundos": round(end.get_seconds(), 2)}
            for start, end in scenes
        ]
    print(json.dumps(result, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
