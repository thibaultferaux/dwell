// function that formats a number to a string with thousand separators and decimal points
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace(/\.(\d{2})/, ".$1");
}

export { formatPrice }