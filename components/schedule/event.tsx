interface EventProps {
    name: string;
    time: string;
    duration: string;
    dayStartTime: number;
    lineHeight: number;
    widthFactor: number;
    position: number;
    padding: number;
    id?: string;
    color?: string;
}

const colorLookup = {
    green: "#1f331e",
    red: "#440101"
}

export const Event = (props: EventProps) => {
    const height = props.lineHeight * toMin(props.duration) - props.padding;
    const top = props.lineHeight * (toMin(props.time) - props.dayStartTime);
    const background = props.color ? {
        backgroundColor: props.color in colorLookup
            ? colorLookup[props.color as "green" | "red"] 
            : props.color
    } : {}

    const widthFactor = props.widthFactor;
    const position = props.position;
    const left = proportionalPosition(position, widthFactor);
    const right = proportionalPosition(widthFactor - (1 + position), widthFactor);

    const leftPadding = left ? 2 : 0;
    const rightPadding = right ? 2 : 0;
    
    const el = (
        <div
            className="event"
            style={{
                height: height,
                top: top,
                left: `${left + leftPadding}%`,
                right: `${right + rightPadding}%`,
                ...background
            }}
        >
            <p className="event-name">{props.name}</p>
            <p className="event-time">{to12Hr(props.time)}</p>
        </div>
    )

    return props.id ? <a href={`#${props.id}`}>{el}</a> : el
}

const proportionalPosition = (position: number, width: number) => {
    return (1 / width) * position * 100
}

const toMin = (time: string) => {
    const hrMin = time.split(":");
    const hr = Number(hrMin[0]);
    const min = Number(hrMin[1]);
    return hr + (min / 60);
}

const to12Hr = (time: string) => {
    const hrMin = time.split(":");
    const hr = (Number(hrMin[0]) - 1) % 12 + 1;
    return `${hr}:${hrMin[1]}`;
}