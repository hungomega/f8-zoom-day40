import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ReduxProvider } from "@/libs/react-redux";
import store from "@/store";
import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <ReduxProvider store={store}>
                <App />
            </ReduxProvider>
        </BrowserRouter>
    </StrictMode>,
);
