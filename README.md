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
import Select from "@/components/Select";

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

| Prop            | Type                                            | Default                    | Description                                                                                        |
| --------------- | ----------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------- |
| `options`       | `Option[]`                                      | Required                   | Array of options to display in the select. Each option should have `label` and `value` properties. |
| `colorScheme`   | `string`                                        | `"gray"`                   | Color scheme for the component. Uses Chakra UI color schemes.                                      |
| `placeholder`   | `string`                                        | `"Best Combobox.."`        | Placeholder text for the input field.                                                              |
| `width`         | `number`                                        | `300`                      | Width of the select component in pixels.                                                           |
| `height`        | `number`                                        | -                          | Custom height for the input field. If not provided, uses the size-based default.                   |
| `size`          | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "xxl"` | `"lg"`                     | Predefined size for the component. Affects font size and padding.                                  |
| `borderRadius`  | `number`                                        | `5`                        | Border radius of the input field in pixels.                                                        |
| `closeOnSelect` | `boolean`                                       | `true`                     | Whether to close the dropdown when an option is selected.                                          |
| `hideSelected`  | `boolean`                                       | `false`                    | Whether to hide the selected option from the dropdown list.                                        |
| `placement`     | `"top" \| "bottom" \| "left" \| "right"`        | `"bottom"`                 | Position of the dropdown relative to the input.                                                    |
| `disableOption` | `(option: Option) => boolean`                   | `() => false`              | Function to determine if an option should be disabled.                                             |
| `popoverProps`  | `object`                                        | `{}`                       | Additional props for the popover container.                                                        |
| `listProps`     | `object`                                        | `{}`                       | Additional props for the options list.                                                             |
| `listItemProps` | `object`                                        | `{}`                       | Additional props for individual list items.                                                        |
| `getLabel`      | `(option: Option) => string`                    | `(option) => option.label` | Custom function to get the display label for an option.                                            |
| `getValue`      | `(option: Option) => string`                    | `(option) => option.value` | Custom function to get the value for an option.                                                    |

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

# MultiSelect Component

A feature-rich, accessible, and customizable multi-select component for React applications. Built with Chakra UI and Downshift, this component allows users to select multiple options with search functionality, keyboard navigation, and customizable styling.

![Select Component Demo](https://github.com/elchin-jafar/select-multiselect-component/commit/3c752cc9ef834e44cb0ffbc471d6e28d239835a2)

## Features

- ✨ Multiple selection support
- 🔍 Optional search/filter functionality
- 🏷️ Customizable tags for selected items
- ⌨️ Full keyboard navigation
- 🎨 Flexible styling options
- ♿ Accessible by default (WAI-ARIA compliant)
- 🗑️ Easy item removal

## Basic Usage

```tsx
import MultiSelect from "@/components/MultiSelect";

const options = [
  { label: "JavaScript", value: "js" },
  { label: "TypeScript", value: "ts" },
  { label: "Python", value: "py" },
  { label: "Java", value: "java" },
];

function App() {
  return <MultiSelect options={options} colorScheme='blue' size='md' />;
}
```

## Props

| Prop                | Type                            | Default                    | Description                                            |
| ------------------- | ------------------------------- | -------------------------- | ------------------------------------------------------ |
| `options`           | `Option[]`                      | Required                   | Array of options to display in the select.             |
| `disableSearch`     | `boolean`                       | `false`                    | Disables the search functionality when true.           |
| `hideSelected`      | `boolean`                       | `true`                     | Hides selected options from the dropdown list.         |
| `colorScheme`       | `CSSProperties["color"]`        | `"gray"`                   | Color scheme for the component using Chakra UI colors. |
| `inputWidth`        | `CSSProperties["width"]`        | `300`                      | Width of the input container in pixels.                |
| `inputHeight`       | `CSSProperties["height"]`       | -                          | Custom height for the input container.                 |
| `inputBorderRadius` | `CSSProperties["borderRadius"]` | `5`                        | Border radius of the input container.                  |
| `tagWidth`          | `CSSProperties["width"]`        | -                          | Width of the selected item tags.                       |
| `tagHeight`         | `CSSProperties["height"]`       | -                          | Height of the selected item tags.                      |
| `tagBorderRadius`   | `CSSProperties["borderRadius"]` | -                          | Border radius of the selected item tags.               |
| `size`              | `"sm" \| "md" \| "lg" \|`       | `"md"`                     | Predefined size affecting fonts and spacing.           |
| `popoverProps`      | `object`                        | `{}`                       | Additional props for the popover container.            |
| `listProps`         | `object`                        | `{}`                       | Additional props for the options list.                 |
| `listItemProps`     | `object`                        | `{}`                       | Additional props for individual list items.            |
| `getLabel`          | `(option: Option) => string`    | `(option) => option.label` | Custom function for option labels.                     |
| `getValue`          | `(option: Option) => string`    | `(option) => option.value` | Custom function for option values.                     |

## Advanced Usage

### Disable Search

Use **disableSearch** to turn off search input.
Search is available by deafult.

```tsx
<MultiSelect options={options} disableSearch={true} />
```

### Hide Selected options

Selected items disappear from dropdown by default. Use **hideSelected** to make selected ones stay. If `hideSelected={false}` passed to component as a prop, selected options will indicate by darker background color. Also at this mode selected elements will have toggle ability to **deselect**.

### Custom Tag Styling

```tsx
<MultiSelect options={options} hideSelected={false} />
```

### Custom List Styling

```tsx
<MultiSelect
  options={options}
  listProps={{
    background: "gray.50",
    borderRadius: "md",
    padding: 2,
  }}
  listItemProps={{
    _hover: { bg: "blue.100" },
  }}
/>
```

### Custom Option Rendering

```tsx
<MultiSelect
  options={options}
  getLabel={(option) => `${option.label} (${option.count})`}
  getValue={(option) => option.id}
/>
```

## Keyboard Navigation

The component supports comprehensive keyboard navigation:

- `↑/↓`: Navigate through options
- `Enter`: Select/deselect highlighted option
- `Backspace`: Remove last selected item
- `Esc`: Close the dropdown
- `Type`: Filter options (when search enabled)
- `Space`: Open/close dropdown

## TypeScript Types

```typescript
interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  disableSearch?: boolean;
  hideSelected?: boolean;
  colorScheme?: CSSProperties["color"];
  inputWidth?: CSSProperties["width"];
  inputHeight?: CSSProperties["height"];
  inputBorderRadius?: CSSProperties["borderRadius"];
  tagWidth?: CSSProperties["width"];
  tagHeight?: CSSProperties["height"];
  tagBorderRadius?: CSSProperties["borderRadius"];
  popoverProps?: BoxProps;
  listProps?: ListRootProps;
  listItemProps?: ListItemProps;
  getLabel?: (option: Option) => string;
  getValue?: (option: Option) => string;
  size?: Sizes;
}
```

## Accessibility

The MultiSelect component implements WAI-ARIA guidelines for combobox and listbox widgets:

- Proper ARIA roles and attributes
- Keyboard navigation support
- Screen reader announcements
- Focus management
- Clear visual feedback

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Elchin Jafar](https://github.com/elchin-jafar)
