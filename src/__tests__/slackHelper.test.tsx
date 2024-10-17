import {
  convertToSlackBlocksToUI,
  handleGameResponse,
  separateEmojisFromText,
} from "../helpers/slackHelper";
import {
  SlackBlockKitLayoutElement,
  GameResponse,
  SlackBlockKitCompositionTextOnly,
} from "../SlackBlockKit";

describe("convertToSlackBlocksToUI", () => {
  it("should convert Slack blocks to UI components", () => {
    const mockBlocks: SlackBlockKitLayoutElement[] = [
      { type: "divider" },
      {
        type: "section",
        text: { type: "mrkdwn", text: "Test" },
        accessory: {
          type: "button",
          text: { type: "plain_text", text: "Click me" },
          action_id: "button-123",
        },
      },
      { type: "actions", elements: [] },
    ];

    const onClose = jest.fn();
    const uiComponents = convertToSlackBlocksToUI(mockBlocks, onClose);

    expect(uiComponents).toHaveLength(3);
    uiComponents.forEach((component) => {
      expect(component).toBeTruthy();
    });
  });
});

describe("handleGameResponse", () => {
  it("should handle success with text", async () => {
    const mockResponse: GameResponse = { type: "response", text: "Success" };
    const adminGameRequest = jest.fn().mockResolvedValue(mockResponse);
    const onSuccessText = jest.fn();
    const onError = jest.fn();

    await handleGameResponse({ adminGameRequest, onSuccessText, onError });

    expect(onSuccessText).toHaveBeenCalledWith("Success");
    expect(onError).not.toHaveBeenCalled();
  });

  it("should handle success with blocks", async () => {
    const mockBlocks: SlackBlockKitLayoutElement[] = [{ type: "divider" }];
    const mockResponse: GameResponse = { type: "response", blocks: mockBlocks };
    const adminGameRequest = jest.fn().mockResolvedValue(mockResponse);
    const onSuccessBlocks = jest.fn();
    const onError = jest.fn();

    await handleGameResponse({ adminGameRequest, onSuccessBlocks, onError });

    expect(onSuccessBlocks).toHaveBeenCalledWith(mockBlocks);
    expect(onError).not.toHaveBeenCalled();
  });

  it("should handle error response", async () => {
    const mockResponse: GameResponse = { type: "error", text: "Error" };
    const adminGameRequest = jest.fn().mockResolvedValue(mockResponse);
    const onError = jest.fn();

    await handleGameResponse({ adminGameRequest, onError });

    expect(onError).toHaveBeenCalledWith(mockResponse);
  });

  it("should handle request failure", async () => {
    const error = new Error("Request failed");
    const adminGameRequest = jest.fn().mockRejectedValue(error);
    const onError = jest.fn();

    await handleGameResponse({ adminGameRequest, onError });

    expect(onError).toHaveBeenCalledWith({
      type: "error",
      text: "Request failed",
    });
  });
});

describe("separateEmojisFromText", () => {
  it("should separate emojis from text", () => {
    const item: SlackBlockKitCompositionTextOnly = {
      type: "mrkdwn",
      text: "Hello :smile: world",
      emoji: true,
    };
    const result = separateEmojisFromText(item);

    expect(result).toEqual([
      { emoji: false, text: "Hello" },
      { emoji: true, text: ":smile:" },
      { emoji: false, text: "world" },
    ]);
  });

  it("should return text as is if no emojis", () => {
    const item: SlackBlockKitCompositionTextOnly = {
      type: "mrkdwn",
      text: "Hello world",
      emoji: false,
    };
    const result = separateEmojisFromText(item);

    expect(result).toEqual([{ emoji: false, text: "Hello world" }]);
  });
});
