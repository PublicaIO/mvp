const errorHandler = (error) => {
    const errorData = error.response.data;
    console.error(error.response.data);

    if (errorData.code === 'PERMISSION_DENIED' || errorData.code === 'BACK_TO_LOGIN') {
        window.location.href = '/';
    }
}

export default errorHandler;
