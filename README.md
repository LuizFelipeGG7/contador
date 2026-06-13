# 💖 Nosso Contador de Amor

Site romântico com contador de tempo juntos, carrossel de fotos e música — feito com carinho.

🔗 **[euteamomuitomais.netlify.app](https://euteamomuitomais.netlify.app)**

---

## Funcionalidades

- **Contador em tempo real** — exibe dias, horas, minutos e segundos desde o início do relacionamento, com animação a cada atualização
- **Carrossel de fotos** — slideshow automático com efeito de crossfade e Ken Burns (zoom suave), dots de progresso estilo stories, suporte a toque/swipe e navegação por botões
- **Música** — player integrado do Spotify com a música do casal
- **Partículas flutuantes** — corações e emojis românticos animados ao fundo
- **Design responsivo** — funciona em celular e desktop

---

## Adicionando novas fotos

1. Coloque a foto na pasta `imagens/`
2. Adicione o nome do arquivo no `imagens/manifest.json`
3. Faça `git add`, `git commit` e `git push`

> O GitHub Action (`update-manifest.yml`) atualiza o `manifest.json` automaticamente sempre que novas imagens forem enviadas para a pasta `imagens/`.

---

## Estrutura

```
contador/
├── index.html                  # Estrutura da página
├── style.css                   # Todo o design e animações
├── script.js                   # Contador, carrossel e partículas
├── imagens/
│   ├── manifest.json           # Lista de fotos do carrossel
│   └── *.jpeg / *.jpg          # Fotos do casal
└── .github/
    └── workflows/
        └── update-manifest.yml # Action de atualização automática
```

---

## Tecnologias

- HTML5, CSS3 e JavaScript puro — sem frameworks ou dependências
- Fontes: [Dancing Script](https://fonts.google.com/specimen/Dancing+Script) e [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts
- Hospedagem: [Netlify](https://netlify.com)