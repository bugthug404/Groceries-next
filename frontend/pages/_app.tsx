import { AuthProvider } from "@/components/auth-provider";
import "@/styles/globals.css";
import Loader from "@/utils/loader";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <Loader />
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
