import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginModalStateProvider from "./contexts/LoginModalContext";
import AuthContextProvider from "./contexts/AuthContext";
import ActionConfirmModalContextProvider from "./contexts/ActionConfirmModalContext";
import AlertContextProvider from "./contexts/AlertContext";

// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const queryClient = new QueryClient();

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <AlertContextProvider>
                    <AuthContextProvider>
                        <LoginModalStateProvider>
                            <ActionConfirmModalContextProvider>
                                <RouterProvider router={router} />
                            </ActionConfirmModalContextProvider>
                        </LoginModalStateProvider>
                    </AuthContextProvider>
                </AlertContextProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
