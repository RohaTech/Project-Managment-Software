import "./bootstrap";
import "../css/app.css";
import "../css/font.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "mt1",
//     wsHost: import.meta.env.VITE_PUSHER_HOST
//         ? import.meta.env.VITE_PUSHER_HOST
//         : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: 6001,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: false,
//     disableStatus: true,
//     enabledTransports: ["ws", "wss"],
// });



const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.jsx`,
      import.meta.glob("./Pages/**/*.jsx")
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#4B5563",
  },
});
