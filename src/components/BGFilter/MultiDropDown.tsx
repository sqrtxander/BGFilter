import type { Dispatch, SetStateAction } from "react";
import Select, { type StylesConfig } from "react-select";

type selectOption = {
    value: string;
    label: string;
}

function MultiDropDown(
    { options, value, setValue }: {
        options: selectOption[],
        value: selectOption[],
        setValue: Dispatch<SetStateAction<selectOption[]>>
    }
) {

    const selectStyles: StylesConfig = {
        input: (styles) => ({
            ...styles,
            color: "var(--fg)"
        }),
        placeholder: (styles) => ({
            ...styles,
            color: "var(--fg)"
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            color: "var(--fg)",
            ":hover": {
                color: "var(--fg)"
            }
        }),
        clearIndicator: (styles) => ({
            ...styles,
            color: "var(--fg)",
            ":hover": {
                color: "var(--red)"
            }
        }),
        control: (styles) => ({
            ...styles,
            backgroundColor: "var(--bg)",
            color: "var(--fg)",
            border: "2px solid var(--fg)",
            borderRadius: "4px",
            ":hover": {
                border: "2px solid var(--fg)",
            },
        }),
        option: (styles, { isFocused }) => ({
            ...styles,
            backgroundColor: isFocused
                ? "var(--bg-highlight)"
                : "var(--bg)",
            color: "var(--fg)",
            cursor: "pointer",
        }),
        multiValue: (styles) => ({
            ...styles,
            backgroundColor: "var(--bg-highlight)"
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: "var(--fg)"
        }),
        multiValueRemove: (styles) => ({
            ...styles,
            color: "var(--fg)",
            ":hover": {
                backgroundColor: "var(--red)"
            }
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: "var(--bg)"
        })
    };

    return <Select
        options={options}
        closeMenuOnSelect={false}
        isMulti
        styles={selectStyles}
        value={value}
        onChange={(option) => setValue(option.map(x => x as selectOption))}
    />
}

export { MultiDropDown, type selectOption }
