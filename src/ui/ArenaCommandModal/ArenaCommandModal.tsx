import { convertToSlackBlocksToUI } from "../../helpers/slackHelper"
import Modal from "../Modal";
import { SlackBlockKitLayoutElement } from "../../SlackBlockKit"

interface IProps {
    show: boolean;
    onClose: () => void;
    slackBlocks: SlackBlockKitLayoutElement[];
}

const ArenaCommandModal = ({
    show,
    onClose,
    slackBlocks,
}: IProps) => {
    return (
        <section>
            <Modal show={show} onClose={onClose}>
                {convertToSlackBlocksToUI(slackBlocks, onClose)}
            </Modal>    
        </section>
    );
};

export default ArenaCommandModal;
