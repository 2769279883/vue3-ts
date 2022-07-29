import LiuRequest from '../index'

import { IAccount, ILoginRequest } from './type'
import { IDataType } from '../types'

enum LoginApi {
  AccountLogin = '/login',
  userInfo = '/users/', // 用法：/users/1
  userMenus = '/role/' //用法：role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return LiuRequest.post<IDataType<ILoginRequest>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return LiuRequest.get<IDataType>({
    url: LoginApi.userInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return LiuRequest.get<IDataType>({
    url: LoginApi.userMenus + id + '/menu',
    showLoading: false
  })
}
