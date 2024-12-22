# Select Component

A highly customizable and accessible select/combobox component for React applications. Built with Chakra UI and Downshift, this component provides a rich set of features including filtering, custom styling, and keyboard navigation.

![Select Component Demo](https://github.com/elchin-jafar/select-multiselect-component/blob/master/select.gif)

## Features

- 🔍 Built-in search/filter functionality
- ⌨️ Full keyboard navigation support
- 🎨 Customizable theming with Chakra UI
- ♿ Accessible by default (WAI-ARIA compliant)
- 🎯 Flexible positioning options
- 🔒 Disabled options support
- 🎭 Custom label and value mapping

## Basic Usage

```tsx
import Select from "./components/Select";

const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
];

function App() {
  return <Select options={options} colorScheme='blue' placeholder='Select a framework...' />;
}
```

## Props

| Prop            | Type                           | Default                    | Description                                                                                        |
| --------------- | ------------------------------ | -------------------------- | -------------------------------------------------------------------------------------------------- |
| `options`       | `Option[]`                     | Required                   | Array of options to display in the select. Each option should have `label` and `value` properties. |
| `colorScheme`   | `string`                       | `"gray"`                   | Color scheme for the component. Uses Chakra UI color schemes.                                      |
| `placeholder`   | `string`                       | `"Best Combobox.."`        | Placeholder text for the input field.                                                              |
| `width`         | `number`                       | `300`                      | Width of the select component in pixels.                                                           |
| `height`        | `number`                       | -                          | Custom height for the input field. If not provided, uses the size-based default.                   |
| `size`          | `"sm" \| "md" \| "lg" \| "xl"` | `"lg"`                     | Predefined size for the component. Affects font size and padding.                                  |
| `borderRadius`  | `number`                       | `5`                        | Border radius of the input field in pixels.                                                        |
| `closeOnSelect` | `boolean`                      | `true`                     | Whether to close the dropdown when an option is selected.                                          |
| `hideSelected`  | `boolean`                      | `false`                    | Whether to hide the selected option from the dropdown list.                                        |
| `placement`     | `"top" \| "bottom"`            | `"bottom"`                 | Position of the dropdown relative to the input.                                                    |
| `disableOption` | `(option: Option) => boolean`  | `() => false`              | Function to determine if an option should be disabled.                                             |
| `popoverProps`  | `object`                       | `{}`                       | Additional props for the popover container.                                                        |
| `listProps`     | `object`                       | `{}`                       | Additional props for the options list.                                                             |
| `listItemProps` | `object`                       | `{}`                       | Additional props for individual list items.                                                        |
| `getLabel`      | `(option: Option) => string`   | `(option) => option.label` | Custom function to get the display label for an option.                                            |
| `getValue`      | `(option: Option) => string`   | `(option) => option.value` | Custom function to get the value for an option.                                                    |

## Advanced Usage

### Custom Option Rendering

```tsx
<Select
  options={options}
  getLabel={(option) => `${option.label} (${option.version})`}
  colorScheme='purple'
/>
```

### Disabled Options

```tsx
const options = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue", isDisabled: true },
  { label: "Angular", value: "angular" },
];

<Select options={options} disableOption={(option) => option.isDisabled} />;
```

### Custom Styling

Customize **width**, **height** or **borderRadius** of Input element by passing props with the same names.

Also there are **popoverProps**, **listProps**, **listItemProps** to customize element itself, dropdown and its elements.

Use **size** prop for predefined styles.

```tsx
<Select
  options={options}
  colorScheme='blue'
  width={400}
  borderRadius={10}
  listProps={{
    background: "gray.50",
    borderRadius: "md",
  }}
  listItemProps={{
    _hover: { bg: "blue.100" },
  }}
  size='lg'
/>
```

### Keep Menu Open After Selection

Component dropdown will close after selecting option by default. Change this behaviour by **closeOnSelect** prop.

```tsx
<Select options={options} closeOnSelect={false} />
```

### Hide Selected Options

Component indicates selected options by background color. Use **hideSelected** to hide selected options instead.

```tsx
<Select options={options} hideSelected={true} />
```

### Dropdown Placement

Dropdown window lays under input element by default. Change position of dropdown using **placement**.
Check [Props](##Props) table for values.

```tsx
<Select options={options} placement='left' />
```

### Value Getter & Label Getter

Component expects value and label direct from given option object:

```tsx
getValue = (option) => option.value;
getLabel = (option) => option.label;
```

You can change how label will shown on component:

```tsx
<Select
    options = {options}
    getLabel = (option) => `updated label ${option.label}`
 />
```

If you passing complex data to options prop, you should define how to get value and label:

```tsx
const options = [
  {
    data: {
      value: 1,
      label: "useless data type",
    },
  },
];
```

Component can properly get value and label by passing **getValue** and **getLabel** props:

```tsx
<Select
    options={options}
    getValue = (option) => option.data.value
    getLabel = (option) => option.data.label
 />
```

## Keyboard Navigation

The component supports full keyboard navigation:

- `↑/↓`: Navigate through options
- `Enter`: Select the highlighted option
- `Esc`: Close the dropdown
- `Type`: Filter options by typing
- `Space`: Open/close dropdown

## Accessibility

The Select component follows WAI-ARIA guidelines for combobox widgets, providing:

- Proper ARIA roles and attributes
- Keyboard navigation
- Screen reader announcements
- Focus management

## TypeScript Types

```typescript
interface Option {
  label: string;
  value: string;
  isDisabled?: boolean;
  [key: string]: any;
}

interface SelectProp {
  options: Option[];
  colorScheme?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  size?: "sm" | "md" | "lg" | "xl";
  borderRadius?: number;
  closeOnSelect?: boolean;
  hideSelected?: boolean;
  placement?: "top" | "bottom";
  disableOption?: (option: Option) => boolean;
  popoverProps?: object;
  listProps?: object;
  listItemProps?: object;
  getLabel?: (option: Option) => string;
  getValue?: (option: Option) => string;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Elchin Jafar](https://github.com/elchin-jafar)
