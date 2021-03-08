import React from "react";
import logoImg from "../img/logo_transparent_background.png";
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';
import LoginButton from '../components/Login-Button'

function Login() {
  return (
    <Card>
      {/* <Logo src={logoImg} />
      <Form>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>Sign In</Button>
      </Form> */}
      <LoginButton />
    </Card>
  );
}

export default Login;