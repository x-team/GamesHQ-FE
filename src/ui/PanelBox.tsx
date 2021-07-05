interface IProps {
    children: React.ReactNode;
}

function PanelBox(props: IProps) {
    return (
        <span className="p-6 w-max bg-white rounded-xl border border-gray-200 flex flex-col">
            {props.children}
        </span>
    );
}

export default PanelBox;
