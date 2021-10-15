interface IProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
}

const calculateClasses = (props: IProps) => {
    if (props.disabled) {
        return "bg-gray-100 text-sm text-gray-400 py-1.5 px-5 rounded-sm cursor-not-allowed";
    }

    return "bg-xteamaccent text-sm text-white py-1.5 px-5 rounded-sm";
};

export default function Button(props: IProps) {
    return (
        <button
            className={calculateClasses(props)}
            type={props.type || undefined}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
}
