const jwt = require("jsonwebtoken");
/**
 * private function generateToken
 * @param user 
 * @param secretSignature 
 * @param tokenLife 
 */
let generateToken = (user, secretSignature, tokenLife) => {
	return new Promise((resolve, reject) => {
		// Define user information
		const userData = {
			_id: user._id,
			name: user.name,
			email: user.email,
		}
		// Sign & create token
		jwt.sign(
			{ data: userData },
			secretSignature,
			{
				algorithm: "HS256",
				expiresIn: tokenLife,
			},
			(error, token) => {
				if (error) {
					return reject(error);
				}
				resolve(token);
			});
	});
}
/**
 * This module used for verify jwt token
 * @param {*} token 
 * @param {*} secretKey 
 */
let verifyToken = (token, secretKey) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secretKey, (error, decoded) => {
			if (error) {
				return reject(error);
			}
			resolve(decoded);
		});
	});
}
module.exports = {
	generateToken: generateToken,
	verifyToken: verifyToken,
};