'use strict'

const Memo = use("App/Models/Memo")
const { validate } = use("Validator")

class MemoController {

	async getMemo({auth, response}) {
		response.json({
			"message" : "OKE!",
			"status" : 200,
			"data" : await auth.user.memo().fetch()
		})
	}

	async createMemo({auth, request, response}) {
		// get input title, content from user
		const {title, content} = request.all()

		const rules = {
			title: "required|string|max:100",
			content: "required|string|max:1999"
		}

		const validation = await validate(request.all(), rules)
		if (validation.fails()) {
			return response.json({
				"message" : "ERROR!",
				"status" : 304,
				"data" : await validation.messages()
			})
		}

		const memo = new Memo()

		memo.user_id = auth.user.id
		memo.title = title
		memo.content = content

		if (await memo.save()) {
			response.json({
				"message" : "OKE!",
				"status" : 200,
			})
		}else{
			response.json({
				"message" : "something went wrong",
				"status" : 500
			})
		}
	}

	async updateMemo({auth, request, response}) {
		//get input title, content from user
		const {id, title, content} = request.all()

		const rules = {
			title: "required|string|max:100",
			content: "required|string|max:1999"
		}

		const validation = await validate(request.all(), rules)
		if (validation.fails()) {
			return response.json({
				"message" : "ERROR!",
				"status" : 304,
				"data" : await validation.messages()
			})
		}
		
		const memo = Memo.query().where("user_id", auth.user.id).where("id", id)

		if (memo.first()) {
			await memo.update({
				title : title,
				content : content
			})

			response.json({
				"message" : "OKE!",
				"status" : 200
			})
		}else{
			response.json({
				"message" : "Memo not found!",
				"status" : 404
			})
		}
	}

	async deleteMemo({auth, params, response}) {
		//get id memo from user
		const id = params.id

		const memo = Memo.query().where("user_id", auth.user.id).where("id", id)

		if (memo.first()) {
			await memo.delete()

			response.json({
				"message" : "OKE!",
				"status" : 200
			})
		}else{
			response.json({
				"message" : "Memo not found!",
				"status" : 404
			})
		}
	}
}

module.exports = MemoController
