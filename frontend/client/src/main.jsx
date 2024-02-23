import React from "react";
import App from "./App.jsx";
import "./assets/scss/main.scss";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import Product from "./components/layout/ContextPK.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { RecoilRoot } from "recoil";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const root = createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <RecoilRoot>
          <Product>
            <App />
          </Product>
        </RecoilRoot>
      </BrowserRouter>
    </ClerkProvider>
  </ChakraProvider>
);
