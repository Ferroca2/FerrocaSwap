import { Component, useState } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';

function AddProduct(){

    const history = useNavigate()

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [document, setDocument] = useState("");

    const [loading, setLoading] = useState(false);

    const category = "credits"


    function onChangeHandler(e) {
        e.preventDefault();
        const handler = e.target.value;

        if(handler == "title"){
            setTitle(e.target.value)
        } else if(handler == "price"){
            setPrice(e.target.value)
        } else if(handler == "description"){
            setDescription(e.target.value)
        } else if(handler == "image"){
            setImage(e.target.files[0])
        } else if(handler == "document"){
            setDocument(e.target.files[0])
        }
        if (e.target.files) {
            this.setState({ image: e.target.files[0] })
        }
    };

    function onSubmitHandler(e) {
        e.preventDefault();
        let obj = { title, price, description, image, document }
        setLoading(true);
        getBase64(image)
            .then((data) => {
                obj['image'] = data;
                createProduct(obj)
                    .then(res => {
                        if (res.error) {
                            
                        } else {
                            history(`/categories/${category}/${res.productId}/details`)
                        }
                    })
                    .catch(err => console.error('Creating product err: ', err))
            })
            .catch(err => console.error('Converting to base64 err: ', err));
    }

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
    return(
        <>
            <SimpleSider />
            <div className='container'>
                <h1 className="heading">Submit your Carbon Credit</h1>
                <Form onSubmit={onSubmitHandler}>
                    <div>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title" name="title" required onChange={this.onChangeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" required onChange={this.onChangeHandler} />
                        </Form.Group>
                    </div>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required onChange={this.onChangeHandler} />
                    </Form.Group>

                    <div>

                        {/* <Form.Group as={Col} controlId="formGridCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" defaultValue="Choose..." name="category" required onChange={this.onChangeHandler}>
                                <option>Choose...</option>
                                <option>properties</option>
                                <option>auto</option>
                                <option>electronics</option>
                                <option>clothes</option>
                                <option>toys</option>
                                <option>home</option>
                                <option>garden</option>
                            </Form.Control>
                        </Form.Group> */}

                        <Form.Group as={Col} controlId="formGridImage" >
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="image" type="file" required onChange={onChangeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridImage" >
                            <Form.Label>Document</Form.Label>
                            <Form.Control name="document" type="file" required onChange={onChangeHandler} />
                        </Form.Group>
                    </div>
                    {this.state.loading ?
                        <Button className="col-lg-12" variant="dark" disabled >
                            Please wait... <Spinner animation="border" />
                        </Button>
                        :
                        <Button className="col-lg-12" variant="dark" type="submit">Add product</Button>
                    }
                </Form>
            </div>
        </>
    );
}

export default AddProduct;