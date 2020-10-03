import { AppState } from './AppStateContext'

// post:
// curl --header "Content-Type: application/json" --request POST --data '{"lists": "[]"}' http://localhost:400/load
// get:
// curl http://localhost:4000/load

// get in js/ts:
// const fetchGithub = async () => { 
//     const { current_user_url } = await fetch('https://api.github.com')
//         .then((response) => {
//             return response.json() as Promise<{ current_user_url: string }>
//         })
//     console.log(typeof current_user_url)
// }

// get with abstact network calls
// const githubApi = <T>() => {
//     return fetch('https://api.github.com').then((response) => {
//         return response.json() as Promise<T>
//     })
// }
// to be called like:
//const { user_search_url } = await githubApi<{ user_search_url: string}>()

// let's start:
export const saveState = (payload: AppState) => {
    return fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/save`,
        {
            method: "POST",
            headers: {
                Accept: "application/jason",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
    ).then(
        (response) => {return response.json()}
    ).catch(
        (err) => console.log(err.message)
    )
}

export const loadState = () => {
    return fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/load`
    ).then(
        (response) => response.json() as Promise<AppState>
    ).catch(
        (err) => console.log(err.message)
    ) 
} 
