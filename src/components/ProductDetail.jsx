import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import './PD.css'

function ProductDetail(){

    
    const [product, setproduct] = useState();

    const p = useParams()
    console.log(p.productId)

    useEffect(() => {
        const url = 'http://localhost:4000/get-product/'+ p.productId;
        axios.get(url)
        .then((res)=>{ 
            console.log(res)
            if(res.data.product){
                setproduct(res.data.product)
            }
        })
        .catch((err)=>{
            alert('Server Err.')
        })
    }, [])

    const handleContact = (addedBy) =>{
        const url = 'http://localhost:4000/get-user/'+ addedBy;
        axios.get(url)
        .then((res)=>{ 
            // console.log(res)
        })
        .catch((err)=>{
            alert('Server Err.')
        })
    }

    return(<>
        
        <Header/>
        {/* <h4>PRODUCT DETAILS:</h4> */}
        <div>
            {product && <div className="d-flex justify-content-between flex-wrap">
                <div>
                    <img className="pd_img" width="700px" height="500px" src={'http://localhost:4000/'+product.pimage} alt=""/>
                    <br></br>
                    <p className="txt2">{product.pname} | {product.category} </p>
                </div>
                <div className="r">
                    <p className="txt2">{product.pname}</p>
                    <h6 className="txt">Product Details: </h6>
                    <p className="txt2">{product.pdesc}</p>
                    <h3 className="m-2 price-text"> Rs. {product.price} /-</h3>
                    <p className="m-2 text-success">{product.pdesc}</p>
                    <button className="bttn" onClick={()=>handleContact(product.addedBy)}>SHOW CONTACT DETAILS</button>
                </div>
            </div>}
        </div>

        

      </>  
    )
}

export default ProductDetail;