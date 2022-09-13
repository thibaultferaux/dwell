import PropTypes from 'prop-types';

const DetailGroup = ({ label, children }) => {
    return (
        <div className='mb-3'>
            <p className="block text-sm font-medium text-yellow-500">{label}</p>
            <p className='block text-lg text-gray-700'>
                {children}
            </p>
        </div>
    )
}

DetailGroup.propTypes = {
    label: PropTypes.string,
};

export default DetailGroup;