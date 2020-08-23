
const display_error = (error) => {
    console.log(error.stack);
    console.log(error.message);
}

module.exports = display_error;