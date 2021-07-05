const emojiToImageSrcMap: { [id: string]: string } = {
    // TEAMS
    ":nightclaw:":
        "https://emoji.slack-edge.com/T0257R0RP/nightclaw/12536d7534ba16aa.png",
    ":corgi:":
        "https://emoji.slack-edge.com/T0257R0RP/corgi/97ece3358f9f36fa.png",

    // WEAPONS
    ":rc06-envisioner:":
        "https://emoji.slack-edge.com/T0257R0RP/rc06-envisioner/34d6fbf7a27788d1.png",
    ":watchman's-chronogun:":
        "https://emoji.slack-edge.com/T0257R0RP/watchman%2527s-chronogun/7a986e72b22cce3d.png",

    // ARMOR
    ":arena-armor-common:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-common/b596097e73185eac.png",
    ":arena-armor-rare:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-rare/c41f6cadf6678033.png",
    ":arena-armor-epic:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-epic/b6f60908f7d1f2c6.png",
    ":arena-armor-legendary:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-legendary/07e16ef899796139.png",

    // UI
    ":health-heart:":
        "https://emoji.slack-edge.com/T0257R0RP/health-heart/f6ed881c1daf0bad.png",
    ":medkit:":
        "https://emoji.slack-edge.com/T0257R0RP/medkit/feb463579cd8d0af.png",
};

export const emojiToImageSrc = (emoji: string) => {
    return emojiToImageSrcMap[emoji] || "";
};

export const emojiToImageTag = (emoji: string, className?: string) => (
    <img
        className={`${className || `h-6 w-6`}`}
        src={emojiToImageSrc(emoji)}
        alt={emoji + " emoji"}
    />
);
