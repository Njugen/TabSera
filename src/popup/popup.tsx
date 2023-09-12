import React from "react";
import { createRoot } from "react-dom/client";
import "./style.scss";
const test = (
    <h1 className="text-3xl">Hello world</h1>
);

const container = document.createElement("div");
document.body.appendChild(container);

const root = createRoot(container);

root.render(test);