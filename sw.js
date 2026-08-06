var CACHE = "agenda-v9";
var ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./icon-maskable.png"];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQUIVOS); }).catch(function () {}));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.map(function (k) { return k === CACHE ? null : caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

// rede primeiro, cache como reserva
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  if (e.request.url.indexOf("http") !== 0) return;
  e.respondWith(
    fetch(e.request).then(function (resp) {
      var copia = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copia); }).catch(function () {});
      return resp;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match("./index.html"); });
    })
  );
});

// botões da notificação: cronometrar, pausar, concluir, feito
self.addEventListener("notificationclick", function (e) {
  var acao = e.action || "";
  var dados = e.notification.data || {};
  var id = dados.id || "";
  if (acao !== "pausar" && acao !== "concluir") e.notification.close();

  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (lista) {
      for (var i = 0; i < lista.length; i++) {
        var c = lista[i];
        if (c.url.indexOf(self.registration.scope) === 0) {
          if (acao) { try { c.postMessage({ acao: acao, id: id }); } catch (x) {} }
          if ("focus" in c) return c.focus();
          return null;
        }
      }
      // app fechado: abre já com a ação na URL
      if (self.clients.openWindow) {
        var url = "./index.html" + (acao ? ("?acao=" + encodeURIComponent(acao) + "&id=" + encodeURIComponent(id)) : "");
        return self.clients.openWindow(url);
      }
      return null;
    })
  );
});
