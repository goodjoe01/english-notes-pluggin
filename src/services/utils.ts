import jwtDecode  from 'jwt-decode'

interface JwtDecode {
  exp: number

}

export const verifyExpirationDate = async (token: string) => {
  if (token) {
    const { exp } = jwtDecode<JwtDecode>(token);
    if (Date.now() >= exp * 1000) {
      console.log('expirado', Date.now())
      chrome.storage.sync.remove('EWToken');
      return true;
    }
    else {
      return false;
    }
  }
}