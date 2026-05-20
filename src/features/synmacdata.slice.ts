import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    resources : [],
    product:[],
    industories:[],
    sub_industries:[],
    product_category:[],
    company_info:null
}

const synmaceSlice = createSlice({
    name:"synmacData",
    initialState,
    reducers:{

        setResourcesFromApi : (state,action) => {
            state.resources = action.payload
        },
        setProductsFromApi:(state,action) =>{

            console.log("Proudctdata",action.payload)
           
             state.product = action.payload
        },
          setIndustoryFromApi:(state,action) =>{
           
             state.industories = action.payload
        },
          setSubIndustoryFromApi:(state,action) =>{
           
             state.sub_industries = action.payload
        },
          setProductCategoryFromApi:(state,action) =>{
           
             state.product_category = action.payload
        },

         setCompanyInfoDataFromApi:(state,action) =>{

            console.log("company info",action.payload)
           
             state.company_info = action.payload.data
        },

    }
})


export const {setResourcesFromApi,setProductsFromApi,setIndustoryFromApi,setSubIndustoryFromApi,setProductCategoryFromApi , setCompanyInfoDataFromApi} = synmaceSlice.actions

export default synmaceSlice.reducer