import React from "react";
import { Link } from 'react-router-dom';
import logoImg from "../img/logo_transparent_background.png";
import { Card, Logo, Form, Input, Button } from '../components/AuthForms';

function Login() {
  return (
    <Card>
      <Logo src={logoImg} />
      <Form>
        <Input type="email" placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>Sign In</Button>
      </Form>
    </Card>
  );
}

export default Login;