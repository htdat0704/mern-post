export const LOCAL_STORAGE_TOKEN_NAME = 'mern-data'
export const apiUrl =
	process.env.NODE_ENV !== 'production'
		? 'http://localhost:4000'
		: 'https://agile-reaches-17285.herokuapp.com'

// export const apiUrlHeroku = 'https://agile-reaches-17285.herokuapp.com'
export const apiUrlHeroku = 'http://localhost:4000'