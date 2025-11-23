import apiSlice from "../../App/apiSlice";

const productApiSlice=apiSlice.injectEndpoints({
    endpoints: (build)=>({
        getProduct: build.query({
            query:()=>({
                url:"api/product"
            }),
            providesTags:["Basket"]       
        }),
       

        getProductById: build.query({
            query:(id)=>({
                url:`api/product/${id}`
            }),
            invalidatesTags:["Basket"]      
        }),

        addProduct: build.mutation({
            query:(product)=>({
                url:"api/product",
                method:"POST",
                body:product 
            }),
            invalidatesTags:["Basket"] 
        }),
 
        updateProduct: build.mutation({
            query:(product)=>({
                url:"api/product",
                method:"PUT",
                body:product
            }),
            invalidatesTags:["Basket"] 
        }),

        deleteProduct: build.mutation({  
            query:(_id)=>({
                url:"api/product",
                method:"DELETE",
                body:{_id}
            }),
            invalidatesTags:["Basket"] 
        })
    }),
})

export const {useGetProductQuery, useLazyGetProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useDeleteProductMutation}=productApiSlice