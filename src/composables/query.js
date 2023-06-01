export const encode = object => window.btoa(JSON.stringify(object))

export const decode = string => JSON.parse(window.atob(string))