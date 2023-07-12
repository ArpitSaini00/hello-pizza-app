import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();

    let options = props.options;
    let priceOptions = Object.keys(options);

    const priceRef = useRef();

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
                return
            }
            return
        }
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }
        let finalPrice = qty * parseInt(options[size]);
        useEffect(() => {
            setSize(priceRef.current.value)
        }, [])

        return (
            <div>
                <div>
                    <div className="card mt-3" style={{ "width": "18rem" }}>
                        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ "maxHeight": "180px", objectFit: "fill" }} />
                        <div className="card-body">
                            <h4 className="card-title">{props.foodItem.name}</h4>
                            <div>
                                <select className="mb-2 me-2 h-100 w-50 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                                    {Array.from(Array(5), (e, a) => {
                                        return (
                                            <option key={a + 1} value={a + 1}>{a + 1}</option>
                                        )
                                    })}
                                </select>
                                <select className="mb-2 h-100 w-50 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                    {priceOptions.map((data) => {
                                        return <option key={data} value={data}>{data}</option>
                                    })}
                                </select>
                                <div className='h-100 fs-5'>
                                    Rs.{finalPrice}/-
                                </div>
                            </div>
                            <hr />
                            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}><b>Add to Cart</b></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
