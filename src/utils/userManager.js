import {createUserManager} from 'redux-oidc'

const userManagerConfig = {
    client_id: '159398241081-4sagd3oue7flv5m7ov1dedvsqvq0f428.apps.googleusercontent.com',
    redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/callback`,
    response_type: 'token id_token',
    scope: 'openid profile email https://www.googleapis.com/auth/youtube.readonly',
    authority: 'https://accounts.google.com',
    silent_redirect_uri: `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
    automaticSilentRenew: true,
    filterProtocolClaims: true,
    loadUserInfo: true
}

const userManager = createUserManager(userManagerConfig)

export default userManager