import { QueryClientProviderWrapper } from "@/common/contexts/QueryClientProviderWrapper";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>;
}
