interface HaveAccountLinkProps {
    question: string;
    linkText: string;
    linkUrl: string;
}

const HaveAccountLink = ({ question, linkText, linkUrl }: HaveAccountLinkProps) => {
    return (
        <>
            {question}&nbsp;
            <a href={linkUrl} className="font-medium text-primary-600 hover:underline dark:text-violet-700">{linkText}</a>
        </>
    );
};

export default HaveAccountLink;