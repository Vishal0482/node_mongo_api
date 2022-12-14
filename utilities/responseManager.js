exports.onSuccess = (message, result, res) => {
    res.status(200).json({
        message: message,
        data: result,
        status: 200,
        isSuccess: true
    });
}

exports.onError = (error, res) => {
	console.log(error.message);
	res.status(500).json({
		message: error.message,
		data: [],
		status: 500,
		isSuccess: false
	});
}

exports.unauthorisedRequest = (res) => {
	res.status(401).json({
		message: "Unauthorized Request!",
		data: [],
		status: 401,
		isSuccess: false
	});
}

exports.forbiddenRequest = (res) => {
	res.status(403).json({
		message: "Access to the requested resource is forbidden! Contact Administrator.",
		data: 0,
		status: 403,
		isSuccess: false
	});
}

exports.badrequest = (error, res) => {
	console.log(error.message);
	res.status(400).json({
		message: error.message,
		data: 0,
		status: 400,
		isSuccess: false
	});
}