import { convertToSlackBlocksToUI } from "../../helpers/slackHelper"
import Modal from "../Modal";
import { SlackBlockKitLayoutElement } from "../../SlackBlockKit"

interface IProps {
    show: boolean;
    onClose: (reload:boolean) => void;
    slackBlocks: SlackBlockKitLayoutElement[];
}

const ArenaCommandModal = ({
    show,
    onClose,
    slackBlocks,
}: IProps) => {
    const handleCloseModal = () => {
        onClose(false);
    }
    
    return (
        <section>
            <Modal show={show} onClose={handleCloseModal}>
                {convertToSlackBlocksToUI(slackBlocks)}
            </Modal>
        </section>
    );
};

export default ArenaCommandModal;
