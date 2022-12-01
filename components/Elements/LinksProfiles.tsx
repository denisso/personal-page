import React from "react";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import Cyberforum from "../../assets/cyberforum.svg";
import Envelope from "@mui/icons-material/MailOutline";
import GitHub from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";

type TypeIconContainer = {
    color?: string;
    width?: number;
    height?: number;
};

type PropsLink = {
    icon:
        | React.ComponentType<React.HTMLAttributes<HTMLOrSVGElement>>
        | typeof Envelope;
    title: string;
    href: string;
} & TypeIconContainer;

const links: {
    [key: string]: PropsLink;
} = {
    github: {
        icon: GitHub,
        title: "Перейти в профиль на сайте Github",
        href: "https://github.com/denisso",
        width: 1.2,
        height: 1.2,
    },
    cyberforun: {
        icon: Cyberforum,
        title: "Перейти в профиль на сайте Cyberforum",
        href: "https://www.cyberforum.ru/members/1837464.html",
        width: 3.5,
    },
    mail: {
        icon: Envelope,
        title: "Отправить письмо по электронной почте на адрес mr_dramm@mail.ru",
        href: "mailto:mr_dramm@mail.ru",
        width: 1.3,
        height: 1.3,
    },
    telegram: {
        icon: TelegramIcon,
        title: "Связь по каналу телеграм",
        href: "https://t.me/DenisReactWebCoder",
        width: 1.3,
        height: 1.3,
    },
};

const IconContainer = styled("div")<TypeIconContainer>`
    display: flex;
    width: ${({ width }) =>
        width ? `calc(var(--iconHeight) * ${width})` : "var(--iconHeight)"};
    height: ${({ height }) =>
        height ? `calc(var(--iconHeight) * ${height})` : "var(--iconHeight)"};
    & .image {
        fill: ${({ color }) => color};
        color: ${({ color }) => color};
        align-items: center;
        width: 100%;
        height: auto;
    }
`;

const CustomLink = ({ link, color }: { link: string; color: string }) => {
    const [client, setClient] = React.useState(false);
    React.useEffect(() => {
        setClient(true);
    }, []);

    const Icon = links[link].icon;

    return client ? (
        <Tooltip title={links[link].title}>
            <Link href={links[link].href} className="anchor" target="_blank">
                <IconContainer
                    width={links[link].width}
                    height={links[link].height}
                    color={color}
                >
                    <Icon className="image" />
                </IconContainer>
            </Link>
        </Tooltip>
    ) : (
        <Link
            href={links[link].href}
            className="anchor"
            target="_blank"
            {...(!client && {
                title: links[link].title,
            })}
        >
            <div className="icon">
                <Icon className="image" />
            </div>
        </Link>
    );
};
CustomLink.displayName = "Customlink";

const Container = styled("div")`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const LinksProfiles = ({
    className,
    color,
}: {
    className?: string;
    color: string;
}) => {
    return (
        <Container className={className}>
            {Object.keys(links).map((link) => (
                <CustomLink key={link} link={link} color={color} />
            ))}
        </Container>
    );
};
