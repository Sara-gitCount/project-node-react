import { useNavigate } from "react-router-dom";
import { useGetProductQuery, useGetProductByIdQuery } from "./productApiSlice"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React, { useState, useEffect, use } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { useDeleteProductMutation, useUpdateProductMutation } from "./productApiSlice"
import { useAddAndUpdateProductMutation } from "../basket/basketApiSlice"
import { useSelector } from "react-redux";
import useAuth from "../auth/useAuth";


const ProductList = () => {

    const [{role}]=useAuth()
    const [layout, setLayout] = useState('grid');
    const { data: basket = [], isSuccess, isLoading, isError, error } = useGetProductQuery();
    const [deleteProduct, { isLoading: isLoading1, isError: isError1, error: error1, isSuccess: isSuccess1 }] = useDeleteProductMutation();
    const [addToBasket, { isSuccess: isSuccess2, error: error2 }] = useAddAndUpdateProductMutation()
    const [quentity, setQuentitiy] = useState();
    const navigate = useNavigate()

    const handleAdd = (add) => {
        const quen = quentity || 1
        addToBasket({ _idProduct: add._idProduct, _idBasket: add._idBasket, quentity: quen })
    }

    const { isUserLoggedIN } = useSelector(state => state.auth)
    useEffect(() => {
    }, [isSuccess]);

    const handleAddManager = () => {
        navigate("/addProduct")
    }

    const handeDelete = (_id) => {
        deleteProduct(_id)
    }

    const handeUpdate = (product) => {
        navigate("/update", { state: { product } })
    }


    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"  style={{width:"50px"}} src={`./${product?.image}.jpg`} alt={product?.name} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{product.name}</div>
                            <Rating value={product.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product.category}</span>
                                </span>
                                <Tag value="INSTOCK"></Tag>
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.price}</span>
                            {isUserLoggedIN && <Button onClick={() => handleAdd({ _idProduct: product._id, _idBasket: localStorage.getItem("_idBasket") })} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                            {isUserLoggedIN &&<input
                                placeholder="כמות"
                                onChange={(e) => { setQuentitiy(e.target.value) }}
                            ></input>}
                        </div>
                        <br></br>
                        <div>
                           {role=="admin"&&<button onClick={() => handeDelete(product._id)}>Delete</button>}
                            {role=="admin"&&<button onClick={() => handeUpdate({ _id: product._id, name: product.name, price: product.price, company: product.company, image: product.image })}>Update</button>}
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value="INSTOCK"></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img height="200" width="200" className="w-9 shadow-2 border-round" style={{width:"50px", height:"2"}} src={`./${product?.image}.jpg`} alt={product?.name} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        {isUserLoggedIN && <Button onClick={() => handleAdd({ _idProduct: product._id, _idBasket: localStorage.getItem("_idBasket") })} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>}
                        {isUserLoggedIN &&<input
                                placeholder="כמות"
                                onChange={(e) => { setQuentitiy(e.target.value) }}
                            ></input>}
                    </div>               
                    <div>
                        <br></br>
                        {role=="admin"&&<button onClick={() => handeDelete(product._id)}>Delete</button>}
                        {role=="admin"&&<button onClick={() => handeUpdate({ _id: product._id, name: product.name, price: product.price, company: product.company, image: product.image })}>Update</button>}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <>
            <div className="card">
                <DataView value={basket} listTemplate={listTemplate} layout={layout} header={header()} />
            </div>
            <br></br>
            {role=="admin"&&<button onClick={() => handleAddManager()}>הוספת מוצר</button>}
        </>
    )
   
}
export default ProductList