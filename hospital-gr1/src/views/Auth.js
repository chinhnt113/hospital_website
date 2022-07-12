import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

const Auth = ({authRoute}) => {
    let body

    body = (
        <>
            {authRoute==='login' && <LoginForm />}
            {authRoute==='register' && <RegisterForm />}
        </>
      )

  return (
    <div className="auth-page">
        {/* viết giao diện sau */}
        {body}
    </div>
  )
}

export default Auth