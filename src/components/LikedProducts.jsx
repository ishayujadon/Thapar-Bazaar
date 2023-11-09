import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useEffect, useState } from "react";
import axios from "axios";
import Categories from "./Categories"; 
import {AiOutlineHeart} from "react-icons/ai";
import './Home.css'

function LikedProducts(){

    const navigate = useNavigate()

    const [products, setproducts] = useState([]);
    const [cproducts, setcproducts] = useState([]);
    const [search, setsearch] = useState('');

    // useEffect(() => {
    //     if (!localStorage.getItem('token')) {
    //         navigate('/')
    //     }
    // }, [])

    useEffect(() => {
        const url = 'http://localhost:4000/liked-products';
        axios.get(url)
        .then((res)=>{ 
            if (res.data.products) {
                setproducts(res.data.products);
            }
        })
        .catch((err)=>{
            alert('Server Err.')
        })
    }, [])

    const handlesearch=(value)=>{
        setsearch(value)
    }

    const handleClick=()=>{
        let filteredProducts = products.filter((item)=>{
            if(item.pname.toLowerCase().includes(search.toLowerCase()) || item.pdesc.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase())){
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handlePage=()=>{
        const url = 'http://localhost:4000/get-products';
        axios.get(url)
        .then((res)=>{ 
            if (res.data.products) {
                setproducts(res.data.products);
                setcproducts([])
            }
        })
        .catch((err)=>{
            alert('Server Err.')
        })
    }

    const handleCategory = (value)=>{
        let filteredProducts = products.filter((item)=>{
            if(item.category==value){
                return item;
            }
        })
        setcproducts(filteredProducts)
    }

    const handleLike = (productId)=>{
        let userId = localStorage.getItem('userId');
        const url = 'http://localhost:4000/like-product';
        const data = {userId,productId};
        axios.post(url,data)
            .then((res) => {
                if(res.data.message){
                    alert('Liked')
                }
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
       
    }
  
    return(
        <div>
            <Header search = {search} handlesearch={handlesearch} handleClick={handleClick} handlePage={handlePage}  />
            <Categories handleCategory={handleCategory}/>
            {cproducts.length>0 && <h5>Search Results</h5>}
            <div className="d-flex justify-content-center flex-wrap">
                {cproducts && cproducts.length>0 &&
                    cproducts.map((item,index)=>{
                        return (
                            <div key={item._id} className="card m-3 car">
                                <div onClick={()=>handleLike(item._id)} className="icon-con">
                                     <AiOutlineHeart className="icons"/>
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/'+item.pimage}/>
                                <p className="m-2">{item.pname} | {item.category}</p>
                                <h3 className="m-2 text-danger">{item.price}</h3>
                                <p className="m-2 text-success">{item.pdesc}</p>
                            </div>
                        )
                })}
            </div>
            <h5>All Results</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length>0 &&
                    products.map((item,index)=>{
                        return (
                            <div key={item._id} className="card m-3">
                                <div onClick={()=>handleLike(item._id)} className="icon-con">
                                     <AiOutlineHeart className="icons"/>
                                </div>
                                <img width="300px" height="200px" src={'http://localhost:4000/'+item.pimage}/>
                                <p className="m-2">{item.pname} | {item.category}</p>
                                <h3 className="m-2 text-danger">{item.price}</h3>
                                <p className="m-2 text-success">{item.pdesc}</p>
                            </div>
                        )
                })}
            </div>
        </div>
    )
}

export default LikedProducts;