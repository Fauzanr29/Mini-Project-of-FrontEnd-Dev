import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
    Row,
    FormGroup,
    Input,
    Label,
    Button,
    Form,
    Col,
} from 'reactstrap'
import request from "../../helpers/request";

const Formproduct = ({type, setFormVisible, formEdited, fetchData}) =>{
    
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const form = {name, quantity, price};

        if (type === 'create') {
            await request.post('/product', form)
                .then(() => fetchData())
                .catch((err) => console.log(err))
        } else {
            await request.put(`/product/${formEdited.id}`, form)
            .then(() => fetchData())
            .catch((err) => console.log(err))
        }
        setFormVisible(false);
    }

    useEffect(() =>{
        if(type === "edit"){
            setName(formEdited.name);
            setQuantity(formEdited.quantity);
            setPrice(formEdited.price);
        }
    }, [type, formEdited])

    return(
    <>
        <Row>
            <Form onSubmit={handleSubmit}>
            <>
                <FormGroup>
                    <Label>Name</Label>
                    <Input 
                        value={name} 
                        placeholder="Please enter your name" 
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Qantity</Label>
                    <Input
                        type = "number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required 
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Price</Label>
                    <Input
                        type = "number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required 
                    />
                </FormGroup>

                <Row>
                    <Col>
                        <Button color="success" type="submit">Submit</Button>
                    </Col>
                    <Col>
                    <Button onClick={() => setFormVisible(false)}>Cancel</Button>
                    </Col>
                    
                </Row>
            </>
            </Form>
        </Row>
    </>
    )
}

export default Formproduct;