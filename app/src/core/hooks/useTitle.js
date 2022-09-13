import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} | Dwell`;
    }, [title]);
};

export default useTitle;
