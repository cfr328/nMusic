import cookie from 'js-cookie';

export function getToken() { //获取本地存储是否有值
    return cookie.get('auth_token')
} 

export function setToken(val){ //本地存储存值
    cookie.set('auth_token', val)
}
