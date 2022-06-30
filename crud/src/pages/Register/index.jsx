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
        email: yup.string().required().email().label('Email'),
        passwod: yup.string().min(6).required(),
        confirmPassword: yup.string().when("password", {
            is: val => (val && val.lenght > 0 ? true : false),
            then: yup.string().oneOf([yup.ref("password")], "Password must match")
        }).required('Required'),
        address: yup.string().required(),
        phone: yup.string().required()
        
    }
)

const Register = () =>{
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            passwod: '',
            confirmPassword: '',
            address: '',
            phone: '',
        },
        validationSchema: validation,
        onSubmit: () => handleRegister()
    
    })

    const handleRegister = async(e) =>{
        const form = formik.values
        await axios.post('http://localhost:7777/register', form)
        .then((res)=>{
            console.log(res);
            sessionStorage.setItem('access_token', res.data.token)
        })
        .catch((err)=> console.log(err))
    }

    console.log("Error:", formik.errors);
    
    return(
        <div>
            <Form onSubmit={formik.handleRegister}>
                <h1>Register</h1>
                <FormGroup>
                    <Label>Name</Label>
                    <Input
                        name="name"
                        values={formik.values.name}
                        onChange = {formik.handleChange}
                        placeholder="Please input your name"
                        required 
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Email</Label>
                    <Input
                        name="email"
                        values={formik.values.email}
                        onChange = {formik.handleChange}
                        placeholder="Please input your email"
                        required 
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input
                        name = "password"
                        values={formik.values.password}
                        onChange = {formik.handleChange}
                        placeholder="Please input your password"
                        type = "password"
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input
                        name = "confirmPassword"
                        values={formik.values.confirmPassword}
                        onChange = {formik.handleChange}
                        placeholder="Password must match"
                        type = "password"
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Address</Label>
                    <Input
                        name="address"
                        values={formik.values.address}
                        onChange = {formik.handleChange}
                        placeholder="Please input your address"
                        required
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                        name="phone"
                        type= "integer"
                        values={formik.values.phone}
                        onChange = {formik.handleChange}
                        placeholder="Please input your phone number"
                        required
                    />
                </FormGroup>

                <br />
                <Button className="btn-submit" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default Register;