interface IProps {
    onClose: () => void;
    show: boolean;
    children?: React.ReactNode;
}

const Modal = ({ children, onClose, show }: IProps) => {
    const handleOnCloseClick = (e: any) => {
        e.stopPropagation();
        onClose();
    };

    if (!show) {
        return null;
    }

    return (
        <div
            className="cursor-auto min-w-screen h-screen animated fadeIn faster fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"
            role="button"
            id="modal-id"
        >
            <div
                onClick={handleOnCloseClick}
                className="absolute bg-black opacity-80 inset-0 z-0"
            ></div>
            <div className="cursor-auto w-full max-w-4xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                {children}
            </div>
        </div>
    );
};

export default Modal;
