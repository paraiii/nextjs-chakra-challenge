// app/layout.tsx
"use client";

import { FooterVersion } from "@/components/FooterVersion";
import { UserGate } from "@/components/UserGate";
import { client } from "@/lib/appo-client"; // ✅ 修正路径
import { ApolloProvider } from "@apollo/client";
import { Button, ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { useState } from "react";

export const RootLayout = ({ children }: { children: ReactNode }) => {
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        {/* ✅ v3：仅一个 ChakraProvider，使用 defaultSystem */}
        <ChakraProvider value={defaultSystem}>
          <ApolloProvider client={client}>
            <Button onClick={() => setGateOpen(true)}>Edit Profile</Button>
            <UserGate
              isOpen={gateOpen}
              onClose={() => setGateOpen(false)}
              onUnlocked={() => console.log("Unlocked!")}
            />
            {children}
            <FooterVersion />
          </ApolloProvider>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
