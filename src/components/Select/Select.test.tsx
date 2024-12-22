import { render, screen } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";
import Select from ".";

const mockOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

const renderSelect = (props = {}) => {
  return render(
    <ChakraProvider value={defaultSystem}>
      <Select options={mockOptions} {...props} />
    </ChakraProvider>,
  );
};

describe("Select Component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    renderSelect();
  });

  it("renderes with label Select", () => {
    const label = screen.getByText("Select");
    expect(label).toBeVisible();
  });

  it("selects an option on click", async () => {
    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.click(screen.getByText("Option 2"));
    expect(input).toHaveValue("Option 2");
  });

  it("selects an option using keyboard", async () => {
    const input = screen.getByRole("combobox");
    await userEvent.click(input);
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    expect(input).toHaveValue("Option 1");
  });

  it("filters options based on input", async () => {
    const input = screen.getByRole("combobox");
    await userEvent.type(input, "Option 3");
    const option3 = screen.queryByText("Option 3");
    const option1 = screen.queryByText("Option 1");
    expect(option3).toBeInTheDocument();
    expect(option1).not.toBeInTheDocument();
  });
});
