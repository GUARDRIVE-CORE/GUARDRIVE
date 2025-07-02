import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Configuração de performance e analytics
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

// Configuração do Service Worker para PWA (opcional)
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
    ),
);

function registerSW() {
  if ("serviceWorker" in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "GuardDrive: Service Worker registrado para desenvolvimento local.",
          );
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log(
        "GuardDrive: Service Worker registrado com sucesso:",
        registration,
      );
    })
    .catch((error) => {
      console.error("GuardDrive: Erro ao registrar Service Worker:", error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log("GuardDrive: Aplicação rodando offline.");
    });
}

// Configuração de erro global
window.addEventListener("error", (event) => {
  console.error("GuardDrive: Erro global capturado:", event.error);
  // Aqui você pode enviar erros para um serviço de monitoramento como Sentry
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("GuardDrive: Promise rejeitada não tratada:", event.reason);
  // Aqui você pode enviar erros para um serviço de monitoramento
});

// Inicialização da aplicação
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Registro do Service Worker (descomente para habilitar PWA)
// registerSW();

// Medição de performance (opcional)
reportWebVitals((metric) => {
  // Enviar métricas para analytics
  console.log("GuardDrive Web Vitals:", metric);

  // Exemplo de envio para Google Analytics
  if (window.gtag) {
    window.gtag("event", metric.name, {
      event_category: "Web Vitals",
      event_label: metric.id,
      value: Math.round(
        metric.name === "CLS" ? metric.value * 1000 : metric.value,
      ),
      non_interaction: true,
    });
  }
});

// Configurações de desenvolvimento
if (process.env.NODE_ENV === "development") {
  console.log("GuardDrive: Aplicação rodando em modo de desenvolvimento");

  // Hot Module Replacement para desenvolvimento
  if (module.hot) {
    module.hot.accept("./App", () => {
      console.log("GuardDrive: Hot reload aplicado");
    });
  }
}

// Configurações de produção
if (process.env.NODE_ENV === "production") {
  console.log("GuardDrive: Aplicação rodando em modo de produção");

  // Desabilitar console.log em produção (opcional)
  // console.log = () => {};
  // console.warn = () => {};
}
