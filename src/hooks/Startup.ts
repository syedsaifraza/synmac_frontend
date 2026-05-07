
'use client'
import { setData } from "@/features/data.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";




const Startup = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch(`https://synmac-backend.serverscripts.in/api/v1/user/product/view-name-list`, {
          // next: { revalidate: 300 }
          cache: "no-store"
        });
        const data = await res.json();

        console.log(data)


         if (data.success) {
        dispatch(setData(data.data));
      }


       
      } catch (error) {
        console.error("Error fetching hero section:", error);
      }
    };

    fetchData();



  }, []);

  return null;
};

export default Startup;

