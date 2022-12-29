import { createContext, useEffect, useState} from "react";
import Api from "../api/Api";


const DataContext = createContext({});

export const DataProvider = ({children}) => {

    const [ getData , setGetData ] = useState([]);
    const [ transData , setTransData ] = useState([]);
    const [mainData , setMainData] = useState([]);
    const [catagory_name, setCatagory_name] = useState("");
    const [catagory_id, setCatagory_id] = useState(0);
    const [amount_type, setAmount_type] = useState("");

    useEffect(() => {
        const fetchData1 = async () => {
            try{
                const response = await Api.get('/catagory')
                setGetData(response.data)
            } catch ( err ) {
                console.log(err.message)
            }
           
        }
        fetchData1();
        const fetchData2 = async () => {
         try{
            const response = await Api.get('/transaction');
            setTransData(response.data)
         } catch (err ) {
            console.log(err.message)
         }                                                                                                                                                              
        }
        fetchData2()
        const fetchData3 = async () => {
         try{
            const response = await Api.get('/main');
            setMainData(response.data)
         } catch (err ) {
            console.log(err.message)
         }                                                                                                                                                              
        }
        fetchData3()
    },[])


return (
    <DataContext.Provider value={{
        getData , setGetData,catagory_name, setCatagory_name,amount_type, setAmount_type, transData ,
         setTransData,mainData , setMainData,catagory_id, setCatagory_id
    }}>{children}</DataContext.Provider>
)

}

export default DataContext;