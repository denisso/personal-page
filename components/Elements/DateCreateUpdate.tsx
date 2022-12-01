import moment from "moment";

export const DateCreateUpdate = ({
    publishedAt,
    firstPublishedAt,
    hidden = false,
}: {
    publishedAt?: string | Date | number;
    firstPublishedAt?: string | Date | number;
    hidden?: boolean;
}) => {
    if (hidden) return <></>;
    return (
        <span className="publishedAt">
            {moment(publishedAt).format("YYYY/MM/DD") !== moment(firstPublishedAt).format("YYYY/MM/DD") ? (
                <span>
                    C:{" "}
                    {moment(firstPublishedAt).format("YYYY/MM/DD")}{" "}
                    U: {moment(publishedAt).format("YYYY/MM/DD")}
                </span>
            ) : (
                <span>
                    U: {moment(publishedAt).format("YYYY/MM/DD")}
                </span>
            )}
        </span>
    );
};
