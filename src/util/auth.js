import { useCookies } from "@vueuse/integrations/useCookies";

const cookie = useCookies();
const TokenKey = "admin-token"

export function setToken(token) {
    cookie.set(TokenKey, token)
}

export function getToken() {
    return cookie.get(TokenKey)
}

export function removeToken() {
    cookie.remove(TokenKey)
}