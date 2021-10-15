interface IProps {
    error?: string;
    name: string;
    touched?: boolean;
    label: string;
    type?: "text" | "number" | "password";
    extraClass?: string;
    helperText?: string;
}

const renderInputError = (error?: string, touched?: boolean) => {
    if (!error || !touched) {
        return;
    }

    return <span className="text-red-500 text-xxs block">{error}</span>;
};

function TextInput({
    helperText,
    error,
    touched,
    type,
    label,
    extraClass,

    ...props
}: IProps) {
    const calculateColors = () => {
        const hasErrors = !!error;

        if (!touched) {
            return "text-gray-700";
        }
        if (hasErrors) {
            return "border-red-500 text-red-600";
        } else {
            return "border-green-500 text-green-600";
        }
    };

    return (
        <span>
            <label
                htmlFor={props.name}
                className="block text-gray-700 text-sm font-bold mb-2"
            >
                {label}

                {helperText ? (
                    <span className="text-xs font-normal">{` ${helperText}`}</span>
                ) : null}
            </label>

            <input
                type={type ?? "text"}
                className={`shadow ${calculateColors()} border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${extraClass}`}
                {...props}
            />

            {renderInputError(error, touched)}
        </span>
    );
}

export default TextInput;
