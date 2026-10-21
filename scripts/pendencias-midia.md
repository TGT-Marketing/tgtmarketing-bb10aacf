# Mídias pendentes do portfólio

O armazenamento do Lovable que guardava as mídias foi apagado. 89 arquivos foram
localizados na pasta "ARQUIVOS SITE TGT MARKETING" do Google Drive (ver
`scripts/midia-drive.json`). Os 10 abaixo não têm arquivo de origem e foram
escondidos em `src/components/PortfolioSection.tsx` até serem repostos.

| Onde aparece | O que falta | Como está hoje |
|---|---|---|
| Gestão de Mídias Sociais > Braza Bar & Restaurante | 4 posts da galeria (originais do Instagram do cliente) | Galeria mostra os 2 posts recuperados |
| Criação de Marca > DGL Eletrônica Têxtil | Imagem da marca (ChatGPT, 7/mai/2026 14h16) | Case oculto (`oculto: true`) |
| Produção de Conteúdos [Foto & Vídeo] | Capa do card (ChatGPT, 7/mai/2026 08h34) | Usa a capa local `src/assets/portfolio-content-cover.png`; vídeos do YouTube seguem |
| Desenvolvimento de Site > Rocha Contábil | Vídeo do site | Sem vídeo; descrição, resultados e link seguem |
| Desenvolvimento de Site > Claudio Poços Artesianos | Vídeo do site | Sem vídeo; descrição, resultados e link seguem |
| Desenvolvimento de Site > Ricks Medicina Ocupacional | Vídeo do site | Sem vídeo; descrição, resultados e link seguem |
| Registro de Marca INPI | Capa do card (ChatGPT, 7/mai/2026 14h19) | Card oculto (`oculto: true`); o serviço segue na seção Serviços |

## Como reativar

1. Coloque o arquivo novo em `public/midia/` (de preferência em `.webp`).
2. Em `PortfolioSection.tsx`, aponte o campo (`image`, `gallery` ou `directVideoUrl`) para `/midia/nome-do-arquivo`.
3. Remova a linha `oculto: true` do item, quando houver.
