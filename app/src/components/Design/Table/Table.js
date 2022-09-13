const Table = ({ children, header }) => {
    return (
        <div className="overflow-x-auto mt-4">
            <div className="inline-block min-w-full">
                <div className="overflow-hidden border border-gray-300 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                        {header}
                        <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Table;
