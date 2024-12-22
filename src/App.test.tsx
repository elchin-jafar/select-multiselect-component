import { render, screen } from "@testing-library/react";
import App from "./App";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

it("should have hello worlds", () => {
  render(
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>,
  );
  const message = screen.queryByText(/Hello World/i);
  expect(message).toBeVisible();
});
