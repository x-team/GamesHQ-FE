interface IProps {
    text: string;
}

const SlackBlockSection = ({
    text
}: IProps) => {
    return (
        <span className="text-xteamaccent font-bold font-sans text-lg italic uppercase">
                {text}
        </span>
    );
};

export default SlackBlockSection;
