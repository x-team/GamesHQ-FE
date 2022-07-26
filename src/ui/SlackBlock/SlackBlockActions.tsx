
import { SlackBlockStaticSelect } from ".";
 import { SlackBlockKitSelectMenuElement, SlackBlockKitButtonElement } from '../../SlackBlockKit';

const SlackBlockActions = (elements: any) => {
    return (
        <SlackBlockStaticSelect staticSelectElement={elements[0]}/>
    )
};

export default SlackBlockActions;
