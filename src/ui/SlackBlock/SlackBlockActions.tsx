
import { SlackBlockStaticSelect } from ".";
 import { SlackBlockKitSelectMenuElement, SlackBlockKitButtonElement } from '../../SlackBlockKit';
import SlackBlockButton from "./SlackBlockButton";

interface IProps {
    elements: (SlackBlockKitSelectMenuElement | SlackBlockKitButtonElement)[]
    onClose: () => void;
}
const SlackBlockActions = ({elements, onClose} : IProps ) => {
    return (
        <span>
        {elements.map(e => {
            if(e.type === 'static_select'){
                return (
                    <SlackBlockStaticSelect staticSelectElement={e} onClose={onClose}/>
                )
            }else{
                return (
                    <SlackBlockButton buttonElement={e} onClose={onClose}/>
                )
            }            
        })}
        </span>
    )
};

export default SlackBlockActions;
