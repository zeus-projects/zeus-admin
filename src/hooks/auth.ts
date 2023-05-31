import { useCookies } from "@vueuse/integrations/useCookies";

const cookie = useCookies();
const TokenKey = "admin-token"

export function useToken() {
   class TokenClass {
      setToken(token) {
         cookie.set(TokenKey, token)
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
