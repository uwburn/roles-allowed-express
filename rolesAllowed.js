var HttpError = require('http-error');

module.exports = function(rolesAllowed, opts) {
	opts = opts || {};
	opts.errorStatus = opts.errorStatus || 403;
	opts.errorMessage = opts.errorMessage || "Forbidden";
	opts.rolesField = opts.rolesField || "roles";

	function middleware(req, res, next) {
		let rolesProvided = req[opts.rolesField];

		if (rolesProvided) {
			for (let role of rolesAllowed) {
				if (rolesProvided.indexOf(role) >= 0) {
					next();
					return;
				}
			}
		}

		if (next)
			next(new HttpError(opts.errorStatus, opts.errorMessage));
		else
			throw new HttpError(opts.errorStatus, opts.errorMessage);
	}

	return middleware;
}

