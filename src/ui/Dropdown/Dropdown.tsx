import { FieldInputProps } from "formik";

interface IProps {
    fieldProps: FieldInputProps<any>;
    label: string;
    hasErrors?: boolean;
    touched?: boolean;

    children?: React.ReactNode;
}

function TextInput({
    fieldProps,
    label,
    children,
    hasErrors,
    touched,
}: IProps) {
    return (
        <span>
            <label
                htmlFor={fieldProps.name}
                className="block text-gray-700 text-sm font-bold mb-2 mr-6"
            >
                {label}
            </label>
            <select
                {...fieldProps}
                className="block shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            >
                {children}
            </select>
        </span>
    );
}

export default TextInput;
