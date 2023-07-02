import { useCookies } from "@vueuse/integrations/useCookies";

const cookie = useCookies();
const TokenKey = "token"

export function useToken() {
   class TokenClass {
      setToken(token) {
         cookie.set(TokenKey, token, { maxAge: 120 })
      }

      getToken() {
         return cookie.get(TokenKey)
      }

      removeToken() {
         cookie.remove(TokenKey)
      }
   }
   return new TokenClass();
}
