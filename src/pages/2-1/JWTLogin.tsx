import React, { useState } from 'react'
import { getCurrentUserInfoWithToken, loginWithToken } from '../../api/login'
import { UserInfo } from '../../types/user'

const JWTLogin = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  const loginSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    const loginResult = await loginWithToken ({
      username: formData.get('username') as string,
      password: formData.get('password') as string
    })

    // TODO: 로그인 연결 및 토큰 가져오기 (loginWithToken 함수 사용)
    if (loginResult.result === 'fail') return

    const userInfo = await getCurrentUserInfoWithToken(loginResult.access_token);

    // TODO: 유저 정보 가져오기 (getCurrentUserInfoWithToken 함수 사용)
    if (userInfo === null) return

    setUserInfo(userInfo);
    console.log(userInfo);
  }

  return (<div>
    <h1>
      Login with JWT - in memory
    </h1>
    <form onSubmit={loginSubmitHandler}>
      <label>
        Username:
        <input type="text" name="username"/>
      </label>
      <label>
        Password:
        <input type="password" name="password" />
      </label>
      <button type="submit" value="Submit">submit</button>
    </form>
    <div>
      <h2>
        User info
      </h2>
      {JSON.stringify(userInfo)}
    </div>
  </div>)
}

export default JWTLogin
