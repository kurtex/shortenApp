interface FormWrapperProps {
    title: string;
    children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ title, children }) => {

    return (
        <div className="flex align-middle justify-center h-screen">
            <section className="rounded-lg flex flex-col justify-center items-center">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {title}
                        </h1>
                        {children}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FormWrapper;