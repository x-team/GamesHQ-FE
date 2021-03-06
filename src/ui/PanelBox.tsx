interface IProps {
    children: React.ReactNode;
    className?: any;
}

function PanelBox(props: IProps) {
    return (
        <span
            className={`p-6 bg-white rounded-xl border border-gray-200 flex flex-col ${props.className}`}
        >
            {props.children}
        </span>
    );
}

export default PanelBox;
