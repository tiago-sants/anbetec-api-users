const axios = require('axios')

let count = 0

async function cronJobUseCase() {
	try {
		const authResponse = await axios.post('http://localhost:3333/sign-in', {
			email: 'admin@contato.com',
			password: 'password',
		})
		const { token } = authResponse.data
				
		const companiesResponse = await axios.get(`${process.env.ANBETEC_API_COMPANIES_BASE_URL}/companies`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const companies = companiesResponse.data

		if (count <= companies.length) {
			const companyId = companies[count]?.id

			const response = await axios.get(
				`${process.env.ANBETEC_API_COMPANIES_BASE_URL}/companies/${companyId}/users`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const users = response.data

			console.log(
				`A empresa ${companies[count].socialReason} possui os seguintes usuários: `
			)
			console.log(users)

			count += 1
		} else {
			console.warn('No more companies in the database.')
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = { cronJobUseCase }
