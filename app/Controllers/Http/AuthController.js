'use strict'

const User = use("App/Models/User")
const Hash = use("Hash")
const { validate } = use("Validator")

class AuthController {
	async login({auth, request}){
		const {email, password} = request.all()
		const token = await auth.authenticator("api").attempt(email, password)

		return token
	}

	async logout({auth, response}){
		await auth.authenticator("api").revokeTokens()
		response.json({
			"message" : "Logged out",
			"status" : 200
		})
	}

	async register({auth, request, response}) {
		//get input from user request
		const {username, email, password} = request.all()

		//create rules validation
		const rules = {
			username: "required|string|unique:users,username",
			email: "required|email|unique:users,username",
			password: "required"
		}

		const validation = await validate(request.all(), rules)
		if (validation.fails()) {
			return response.json({
				"message" : "ERROR!",
				"status" : 304,
				"data" : validation.messages()
			})
		}

		const user = new User()
		user.username = username
		user.email = email
		user.password = await Hash.make(password)

		if (await user.save()) {
			response.json({
				"message" : "OKE!",
				"status" : 200
			})
		} else {
			response.json({
				"message" : "Something went wrong!",
				"status" : 404
			})
		}

	}

	async profile({auth, response}) {
		return response.send(auth.current.user)
	}
}

module.exports = AuthController
