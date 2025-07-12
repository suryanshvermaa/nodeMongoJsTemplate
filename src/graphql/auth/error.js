const graphQlError = (err) => {
	return {
		success: false,
		message: err.message,
		data: {},
	};
};
export default graphQlError;
