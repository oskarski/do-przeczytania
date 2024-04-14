import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, refetchOnWindowFocus: false },
  },
});

export const renderComponent = (children) => {
  return render(
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>,
  );
};
