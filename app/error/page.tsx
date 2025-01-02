interface ErrorPageProps {
    searchParams: Record<string, string>;
}

export default function ErrorPage ({ searchParams }: ErrorPageProps) {

    const error = searchParams['errorMessage'];

    return <div>
        <h2>Sorry, something went wrong</h2>
        <p>{error}</p>
    </div>;
}