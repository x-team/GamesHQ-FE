const emojiToImageSrcMap: { [id: string]: string } = {
    // TEAMS
    ":nightclaw:":
        "https://emoji.slack-edge.com/T0257R0RP/nightclaw/12536d7534ba16aa.png",
    ":corgi:":
        "https://emoji.slack-edge.com/T0257R0RP/corgi/97ece3358f9f36fa.png",
    ":ragnar:":
        "https://emoji.slack-edge.com/T0257R0RP/ragnar/04e25e482cac6f41.png",

    // WEAPONS
    ":rc06-envisioner:":
        "https://emoji.slack-edge.com/T0257R0RP/rc06-envisioner/34d6fbf7a27788d1.png",
    ":watchman's-chronogun:":
        "https://emoji.slack-edge.com/T0257R0RP/watchman%2527s-chronogun/7a986e72b22cce3d.png",
    ":loader-gun-gamma-26:":
        "https://emoji.slack-edge.com/T0257R0RP/loader-gun-gamma-26/a53f2e102e91a965.png",

    ":br58-battle-rifle:":
        "https://emoji.slack-edge.com/T0257R0RP/br58-battle-rifle/11e111ab1857e4d3.png",
    ":nbl8-leviathan:":
        "https://emoji.slack-edge.com/T0257R0RP/nbl8-leviathan/d9d7222293082421.png",
    ":nossec's-prime:":
        "https://emoji.slack-edge.com/T0257R0RP/nossec%2527s-prime/1b52aca513fbb904.png",
    ":interceptor-viii:":
        "https://emoji.slack-edge.com/T0257R0RP/interceptor-viii/3169eba065ee092c.png",
    ":flare-blasters-m21:":
        "https://emoji.slack-edge.com/T0257R0RP/flare-blasters-m21/1c256e330d689818.png",
    ":kobol's-thunderbolt:":
        "https://emoji.slack-edge.com/T0257R0RP/kobol%2527s-thunderbolt/dbf4814ca8141671.png",

    // ARMOR
    ":arena-armor-common:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-common/b596097e73185eac.png",
    ":arena-armor-rare:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-rare/c41f6cadf6678033.png",
    ":arena-armor-epic:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-epic/b6f60908f7d1f2c6.png",
    ":arena-armor-legendary:":
        "https://emoji.slack-edge.com/T0257R0RP/arena-armor-legendary/07e16ef899796139.png",
    ":kade's-dualpistols:":
        "https://emoji.slack-edge.com/T0257R0RP/kade%2527s-dualpistols/bcdf7da6e0cffdeb.png",

    // UI
    ":health-heart:":
        "https://emoji.slack-edge.com/T0257R0RP/health-heart/f6ed881c1daf0bad.png",
    ":medkit:":
        "https://emoji.slack-edge.com/T0257R0RP/medkit/feb463579cd8d0af.png",
    ":cheer-star:":
        "https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f31f.png",
};

export const emojiToImageSrc = (emoji: string, allEmoji: IAllEmoji) => {
    let formattedEmoji = emoji.substring(1, emoji.length - 1);
    if (allEmoji[formattedEmoji]) {
        return allEmoji[formattedEmoji];
    }

    return (
        emojiToImageSrcMap[formattedEmoji] ||
        "https://via.placeholder.com/128x128"
    );
};

export const emojiToImageTag = (
    emoji: string,
    allEmoji: IAllEmoji,
    className?: string
) => {
    return (
        <img
            className={`inline ${className || `h-6 w-6`}`}
            src={emojiToImageSrc(emoji, allEmoji)}
            alt={emoji + " emoji"}
        />
    );
};
