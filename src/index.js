import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import Root from "./root";
import SidebarProvider from "./utils/context/SidebarProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loading from "./components/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<Loading />}>
            <Root />
          </Suspense>
        </BrowserRouter>
      </SidebarProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
