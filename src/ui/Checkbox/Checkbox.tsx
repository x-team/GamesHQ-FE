interface IProps {
    id?: string;
    onChange: (e: React.ChangeEvent<any>) => void;
    name: string;
    value: string;
    error?: string;
    touched?: boolean;
    children?: React.ReactNode;
}

function Checkbox({ id, onChange, value, name, children }: IProps) {
    let checked;
    if (Array.isArray(value)) {
        checked = value.map(i => i).includes(id);
    } else {
        checked = !!value;
    }

    return (
        <span className="flex items-center text-gray-700 my-2">
            <input
                type="checkbox"
                id={id}
                className="h-5 w-5 mr-2 text-blue-500"
                name={name}
                value={id}
                checked={checked}
                onChange={onChange}
            />

            <label htmlFor={name}>{children}</label>
        </span>
    );
}

export default Checkbox;
