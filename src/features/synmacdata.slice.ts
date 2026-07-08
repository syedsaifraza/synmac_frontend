import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    resources : [],
    product:[],
    blogs:[],
    news:null,
    success:[],
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
         setBlogsFromApi : (state,action) => {
            state.blogs = action.payload
        },


           setNewFromApi : (state,action) => {
            state.news = action.payload
        },

           setSuccessFromApi : (state,action) => {
            state.success = action.payload
        },



        setProductsFromApi:(state,action) =>{

          
           
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

        
           
             state.company_info = action.payload.data
        },

    }
})


export const {setResourcesFromApi,setProductsFromApi,setIndustoryFromApi,setSubIndustoryFromApi,setProductCategoryFromApi,setNewFromApi,setSuccessFromApi ,setBlogsFromApi, setCompanyInfoDataFromApi} = synmaceSlice.actions

export default synmaceSlice.reducer