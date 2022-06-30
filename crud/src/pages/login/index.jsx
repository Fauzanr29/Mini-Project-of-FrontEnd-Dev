import React from "react";
import {useFormik} from 'formik';
import * as yup from 'yup';
import { 
    Form, 
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Button,
} from "reactstrap";

import{
    Navigate,
} from 'react-router-dom'
import axios from "axios";

const validation = yup.object().shape(
    {
        email : yup.string().required().email().label('Email'),
        password: yup.string().min(6).required(),
    }
)

const Login = () =>{

    const isAuth = sessionStorage.getItem('access_token');
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validation,
        onSubmit: () => handleLogin()
    })
    
    const handleLogin = async () =>{
        const form = formik.values
        await axios.post('http://localhost:7777/login', form)
        .then((res) => {
            console.log(res);
            sessionStorage.setItem('access_token', res.data.token)
        })
        .catch((err) => console.log(err))
    
        if(sessionStorage.getItem('access_token')) window.location.href ="/dashboard"
    }


    if(isAuth) return <Navigate to="/dashboard" />

    return(
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Login</h1>
                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        values={formik.values.email}
                        placeholder="Please input your email"
                        onChange={formik.handleChange}
                        name="email"
                        id="email"
                        invalid={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    {
                        formik.touched.email && Boolean(formik.errors.email) &&
                        <FormFeedback>{formik.errors.email}</FormFeedback>
                    }
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        values={formik.values.password}
                        placeholder="Please input your password"
                        onChange={formik.handleChange}
                        name="password"
                        id="password"
                        invalid={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    {
                        formik.touched.password && Boolean(formik.errors.password) &&
                        <FormFeedback>{formik.errors.password}</FormFeedback>
                    }
                </FormGroup>

                <br />
                <Button className="btn-submit" type="submit">
                    Login
                </Button>
                
            </Form>
        </div>
    )
}

export default Login;