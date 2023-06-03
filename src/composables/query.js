export const encode = object => window.btoa(JSON.stringify(object))

export const decode = string => {
    try {
        return JSON.parse(window.atob(string))
    }
    catch {
        throw 'Invalid Query'
    }
}