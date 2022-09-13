const PageHeader = ({ children }) => {
    return (
        <div className="flex justify-between items-center mt-4 mb-2">
            {children}
        </div>
    );
};

export default PageHeader;
