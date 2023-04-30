import { Component, useState } from 'react';
import { Form, Button, Col, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/productData';
import SimpleSider from '../components/Siders/SimpleSider';
import '../components/CreateSell/CreateSell.css';
import { connectMetamask } from '../utils/connectMetamask';
import { ethers } from "ethers";
import { creditTokensABI } from '../artifacts/creditTokens';
import { CREDIT_1155_ADDRESS } from '../utils/abis';

function AddProduct(){

    const history = useNavigate()

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [document, setDocument] = useState("");
    const [quantity, setQuantity] = useState(0);


    const [loading, setLoading] = useState(false);

    const [address, setAddress] = useState("");
    const [signer, setSigner] = useState("");
    const [provider, setProvider] = useState("");
    const category = "credits";

    const [created, setCreated] = useState(false);

    async function createToken(){
        setLoading(true);
        const contract = new ethers.Contract(CREDIT_1155_ADDRESS, creditTokensABI["abi"], signer);
        const newQtd = ethers.utils.parseEther(String(quantity));

        const tx = await contract.functions.createToken(title, newQtd);
        await tx.wait();

        console.log(tx);
    }


    async function setTokenPrice(){
        setLoading(true);
        const contract = new ethers.Contract(CREDIT_1155_ADDRESS, creditTokensABI["abi"], signer);
        const newPrice = ethers.utils.parseEther(String(price));

        const tx = await contract.functions.setTokenPRice(1, newPrice).sendTransaction();
        await tx.wait();

    }
    

    async function connect(){
        try{
            if(address ==""){
                const connection = await connectMetamask();
                if(connection){
                    setAddress(connection.address);
                    setSigner(connection.web3Signer);
                    setProvider(connection.web3Provider);
                }
                setCreated(false);
                return;
            }
            if(!created){
                try{
                    await createToken();
                    setCreated(true);
                } catch(err){
                    return;
                }
            }
            await setTokenPrice();
        } catch(err){
            return;
        } finally{
            setLoading(false);
        }

    }


    function onChangeHandler(e) {
        e.preventDefault();
        const handler = e.target.value;

        if(handler == "title"){
            setTitle(e.target.value)
        } else if(handler == "price"){
            setPrice(e.target.value)
        } else if(handler == "quantity"){
            setQuantity(e.target.value)
        } else if(handler == "description"){
            setDescription(e.target.value)
        } else if(handler == "image"){
            setImage(e.target.files[0])
        } else if(handler == "document"){
            setDocument(e.target.files[0])
        }
    };


    function onSubmitHandler(e) {
        e.preventDefault();
        let obj = { title, price, description, image, document }
        setLoading(true);
        // getBase64(image)
        //     .then((data) => {
        //         obj['image'] = data;
        //         createProduct(obj)
        //             .then(res => {
        //                 if (res.error) {
                            
        //                 } else {
        //                     history(`/categories/${category}/${res.productId}/details`)
        //                 }
        //             })
        //             .catch(err => console.error('Creating product err: ', err))
        //     })
        //     .catch(err => console.error('Converting to base64 err: ', err));
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
                            <Form.Control type="text" placeholder="Enter title" name="title" required onChange={onChangeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Price" name="price" required onChange={onChangeHandler} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>Quantity of Credits to be created</Form.Label>
                            <Form.Control type="number" step="0.01" placeholder="Quantity" name="quantity" required onChange={onChangeHandler} />
                        </Form.Group>
                    </div>

                    <Form.Group controlId="formGridDescription.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" required onChange={onChangeHandler} />
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
                    {loading ?
                         <Button className="col-lg-12" variant="dark" disabled >
                         Please wait... <Spinner animation="border" />
                     </Button>
                     :

                    <Button 
                    onClick={connect}
                    className="col-lg-12" variant="dark" type="submit">
                        {address == "" ? "Connect Wallet":
                        (created ? "Define Price" : "Emit token")}
                    </Button>
                    }
                </Form>
            </div>
        </>
    );
}

export default AddProduct;