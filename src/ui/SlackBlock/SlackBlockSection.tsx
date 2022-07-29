import { SlackBlockMultiStaticSelect } from ".";
import { SlackBlockKitMultiSelectMenuElement} from "../../SlackBlockKit";
interface IProps {
    text: string;
    acessory?: SlackBlockKitMultiSelectMenuElement,
    onClose: () => void;
}

const SlackBlockSection = ({
    text,
    acessory,
    onClose
}: IProps) => {
    return (
        <span>
            <span className="text-xteamaccent font-bold font-sans text-lg italic uppercase">
                {text}
            </span>
            {acessory ? (
                <SlackBlockMultiStaticSelect multiStaticSelectElement={acessory} onClose={onClose}/>
            ): ""}
        </span>
    );
};

export default SlackBlockSection;
