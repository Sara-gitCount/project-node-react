
import { useGetProductsQuery, useAddAndUpdateProductMutation, useDeleteAndUpdateProductMutation } from "./basketApiSlice";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React, { useState, useEffect } from 'react';
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';

const MyBasket = () => {
    const { data: basket = [], isSuccess, isLoading, isError, error } = useGetProductsQuery(localStorage.getItem("_idBasket"))
    const [addAndUpdate] = useAddAndUpdateProductMutation()
    const [deleteAndUpdate] = useDeleteAndUpdateProductMutation()
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (isSuccess && basket) {
            const filtered = basket.filter((item) => item.product != null)
            setProducts(filtered)
        }
    }, [isSuccess, basket]);

    const handeAddEndUpdate = (add) => {
        addAndUpdate(add)

    }

    const handeDeleteEndUpdate = (remove) => {
        console.log(remove,"re");
        deleteAndUpdate(remove)
    }

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img
                    src={`./${item.product?.image}.jpg`}
                    alt={item.product.name}
                    style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                        display: "block",
                        maxWidth: "none",
                        maxHeight: "none"
                    }}
                />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.product.name}</span>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-tag text-sm"></i>
                        <span> כמות: {item.quentity}</span>
                    </div>
                </div>
                <span className="font-bold text-900">${item.product.price}</span>
                <Button label="+" onClick={()=>handeAddEndUpdate({_idBasket:localStorage.getItem("_idBasket"), _idProduct:item.product._id, quentity:item.quentity+1})}/>
                <Button label="delete" onClick={()=>handeDeleteEndUpdate({_idBasket:localStorage.getItem("_idBasket"), _idProduct:item.product._id, quentity:0})} icon="pi pi-check" />
                <Button label="-" onClick={()=>handeDeleteEndUpdate({_idBasket:localStorage.getItem("_idBasket"), _idProduct:item.product._id, quentity:item.quentity-1})} />
            </div>
        );
    };


    if (isLoading)
        return <h1>loשding...</h1>
    if (isError)
        return <h1>Error:{error}</h1>
    return (
        <div>
            <h2>My Basket</h2>
            <div className="card xl:flex xl:justify-content-center">
                <OrderList dataKey="product._id" value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="Products" filter filterBy="product.name"></OrderList>
            </div>
        </div>
    )
}

export default MyBasket;