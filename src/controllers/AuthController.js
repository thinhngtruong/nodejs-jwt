const jwtHelper = require("../helpers/jwt.helper");
let tokenList = {};
const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-example-thinhnguyen.com";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "access-token-secret-example-thinhnguyen.com";
/**
 * controller login
 * @param {*} req 
 * @param {*} res 
 */
let login = async (req, res) => {
	try {
		const userFakeData = {
			id: "12345",
			name: "user",
			email: req.body.email,
		};
		const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

		const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);

		tokenList[refreshToken] = { accessToken, refreshToken };

		return res.status(200).json({ accessToken, refreshToken });
	} catch (error) {
		return res.status(500).json(error);
	}
}
/**
 * controller refreshToken
 * @param {*} req 
 * @param {*} res 
 */
let refreshToken = async (req, res) => {
	const refreshTokenFromClient = req.body.refreshToken;

	if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
		try {
			const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
			// User data can get by decoded.data
			const userFakeData = decoded.data;
			const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
			// Send new token to client
			return res.status(200).json({ accessToken });
		} catch (error) {
			debug(error);
			res.status(403).json({
				message: 'Invalid refresh token.',
			});
		}
	} else {
		return res.status(403).send({
			message: 'No token provided.',
		});
	}
};
module.exports = {
	login: login,
	refreshToken: refreshToken,
}