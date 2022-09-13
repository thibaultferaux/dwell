import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

const BackButton = ({ href = "/" }) => {
    return (
        <Link
            to={href}
            className="text-gray-300 mt-4 -mb-2 flex items-center underline underline-offset-2 decoration-gray-300 hover:text-gray-400 hover:decoration-gray-400">
            <BiArrowBack />
            <span className="block ml-1">Back</span>
        </Link>
    );
};

export default BackButton;
