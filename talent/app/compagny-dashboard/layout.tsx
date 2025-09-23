
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CompagnySidebar } from "./_components/sidebar";






export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <TRPCReactProvider>
            <Toaster richColors />
            <SidebarProvider>
                <CompagnySidebar/>
                <main>
                
                    {children}
                </main>
            </SidebarProvider>

        </TRPCReactProvider>

    );
}
