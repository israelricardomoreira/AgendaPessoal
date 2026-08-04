# Minha Agenda — instalar no celular

## Arquivos

```
index.html          o app inteiro (HTML + CSS + JS, sem dependências)
manifest.json       identidade do app (nome, ícone, cor)
sw.js               service worker — faz funcionar offline
icon-192.png        ícone
icon-512.png        ícone
icon-maskable.png   ícone adaptativo do Android
```

Todos precisam ficar **na mesma pasta**.

## Publicar no GitHub Pages

1. Crie um repositório novo (pode ser público).
2. Suba os 6 arquivos na raiz.
3. Settings → Pages → Source: `Deploy from a branch` → branch `main`, pasta `/ (root)`.
4. Aguarde uns minutos. A URL sai como `https://SEUUSUARIO.github.io/NOME-DO-REPO/`.

O HTTPS do GitHub Pages já é suficiente para o service worker funcionar.

## Instalar como app no Android

1. Abra a URL no **Chrome** do celular.
2. Menu (⋮) → **Adicionar à tela inicial** / **Instalar app**.
3. Confirme.

Vai aparecer um ícone na gaveta de apps. Abre em tela cheia, sem barra de endereço, e funciona sem internet.

## Instalar no iPhone

1. Abra a URL no **Safari** (só funciona no Safari).
2. Botão compartilhar → **Adicionar à Tela de Início**.

## Sobre os dados

Ficam no armazenamento do próprio navegador, no aparelho. Não vão para nenhum servidor.

Eles **somem** se você:
- limpar dados de navegação do Chrome/Safari,
- desinstalar o app pela tela inicial,
- usar aba anônima.

Por isso: **aba Dados → Exportar** de vez em quando. Guarde o `.json` no Google Drive. Para restaurar (celular novo, dados perdidos), abra o arquivo, copie o conteúdo e use **Importar**.

## Se quiser um APK de verdade depois

O PWA já publicado pode ser empacotado sem reescrever nada:

- **PWABuilder** (pwabuilder.com): cola a URL, ele gera o APK/AAB assinado.
- **Bubblewrap** (CLI do Google): `npx @bubblewrap/cli init --manifest https://SUAURL/manifest.json`

Só vale a pena se você quiser publicar na Play Store. Para uso pessoal, o PWA instalado faz a mesma coisa.

## Atualizar o app

Suba o `index.html` novo no GitHub e mude a linha `var CACHE = "agenda-v2";` no `sw.js` para `"agenda-v3"`. Isso força o celular a baixar a versão nova na próxima abertura.
