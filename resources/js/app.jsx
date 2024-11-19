import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "../css/app.css";
import "../css/styleNull.css";
import "../css/styleRoot.css";
import "../css/styleGlobal.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { InertiaProgress } from "@inertiajs/progress";

const appName = import.meta.env.VITE_APP_NAME || "Магазин обуви Джоватти";

InertiaProgress.init({
    color: "#4B5563",
});

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
});
