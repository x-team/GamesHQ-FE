import { SlackBlockKitLayoutElement, SlackBlockKitDividerLayout, SlackBlockKitActionLayout, SlackBlockKitSectionLayout } from '../SlackBlockKit'
import { SlackBlockDivider, SlackBlockSection, SlackBlockActions} from '../ui/SlackBlock'

const slackBlockMap = {
  'divider': (_: SlackBlockKitDividerLayout) => <SlackBlockDivider/>,
  'section': (block: SlackBlockKitSectionLayout ) => <SlackBlockSection text={block.text.text} />,
  'actions': (block: SlackBlockKitActionLayout) => <SlackBlockActions elements={block.elements}/>,
  'context': null,
  'header': null,
  'input': null,
}

export const convertToSlackBlocksToUI = (
    slackBlocks: SlackBlockKitLayoutElement[],
) => {
    const slackBlockUis = slackBlocks.map(block => {
      return slackBlockMap[block.type]?.(block as any)
    })

    return slackBlockUis
};


