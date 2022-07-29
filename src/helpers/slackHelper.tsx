import { SlackBlockKitLayoutElement, SlackBlockKitDividerLayout, SlackBlockKitActionLayout, SlackBlockKitSectionLayout, GameResponse, SlackBlockKitMultiSelectMenuElement } from '../SlackBlockKit'
import { SlackBlockDivider, SlackBlockSection, SlackBlockActions} from '../ui/SlackBlock'

const slackBlockMap = {
  'divider': (_: SlackBlockKitDividerLayout) => <SlackBlockDivider/>,
  'section': (block: SlackBlockKitSectionLayout, onClose: () => void ) => <SlackBlockSection text={block.text.text} acessory={block.accessory as SlackBlockKitMultiSelectMenuElement} onClose={onClose} />,
  'actions': (block: SlackBlockKitActionLayout, onClose: () => void) => <SlackBlockActions elements={block.elements} onClose={onClose}/>,
  'context': null,
  'header': null,
  'input': null,
}

export const convertToSlackBlocksToUI = (
    slackBlocks: SlackBlockKitLayoutElement[],
    onClose: () => void
) => {
    const slackBlockUis = slackBlocks.map(block => {
      return slackBlockMap[block.type]?.(block as any, onClose)
    })

    return slackBlockUis
};


export const handleGameResponse = async (params: {
    adminGameRequest: () => Promise<GameResponse>, 
    onSuccessText?: (resp: string) => void, 
    onSuccessBlocks?: (resp: SlackBlockKitLayoutElement[]) => void, 
    onError: (resp: GameResponse) => void
  }) => {
    const {adminGameRequest, onSuccessText, onSuccessBlocks, onError} = params
    try{
        const gameResponse = await adminGameRequest()

        if(gameResponse.type === 'response'){
            if(gameResponse.blocks){
                onSuccessBlocks?.(gameResponse.blocks)
            }else if(gameResponse.text){
                onSuccessText?.(gameResponse.text)
            }  
        }else{
          onError(gameResponse)
        }
    } catch(e: any) {
      console.log(e)
      onError({
        type: 'error',
        text: e.response?.data?.message || e.message
      })
    }
    };

