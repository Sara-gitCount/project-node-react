import apiSlice from "../../App/apiSlice"

const basketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBasket: build.query({
            query: (_idUser) => ({
                url: `api/basket/${_idUser}`,
            }),
            providesTags: ["Basket"]
        }),

        getById: build.query({
            query: (_id) => ({
                url: `api/basket/byId/${_id}`,
            }),
            providesTags: ["Basket"]
        }),

        getProducts: build.query({
            query: (_idBasket) => ({
                url: `api/basket/products/${_idBasket}`,
            }),
            providesTags: ["Basket"]
        }),

        createBasket: build.mutation({
            query: (_idUser) => ({
                url: "api/basket",
                method: "POST",
                body: _idUser
            }),
            invalidatesTags: ["Basket"]
        }),

        addAndUpdateProduct: build.mutation({
            query: (add) => ({
                url: "api/basket/add",
                method: "PUT",
                body: add
            }),
            invalidatesTags: ["Basket"]
        }),

        deleteAndUpdateProduct: build.mutation({
            query: (remove) => ({
                url: "api/basket/delete",
                method: "PUT",
                body: remove
            }),
            invalidatesTags: ["Basket"]
        })
    })
})

export const { useLazyGetBasketQuery, useCreateBasketMutation, useAddAndUpdateProductMutation, useDeleteAndUpdateProductMutation, useGetByIdQuery, useGetProductsQuery } = basketApiSlice