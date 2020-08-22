
const display_error = (error) =>{
    console.log(error.stack);
    alert(error.message);
}

export default display_error;