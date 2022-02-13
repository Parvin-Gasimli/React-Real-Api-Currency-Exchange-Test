import "./styles/style.css"
import Currency from './Currency';
import { useEffect ,useState} from "react";


const BASE_URL='https://v6.exchangerate-api.com/v6/a3203fb49cff7e6c525af728/latest/USD'



function App() {
  const [currencyOptions,setCurrencyOptions]=useState([])
  const [fromcurrency,setFromCurrency]=useState();
  const[tocurrency, setTocurrency]=useState();
  const[Ammount,setAmmount]=useState(1);
  const [AmmountInFromCurrency,setAmmountrFromCurrency]=useState(true)
  const[ExchangeRate,setExchangeRate]=useState();
 let toAmmount,FromAmmount;
 if(AmmountInFromCurrency){
   FromAmmount=Ammount;
   toAmmount=Ammount*ExchangeRate
 }
 else{
   toAmmount=Ammount;
   FromAmmount=Ammount/ExchangeRate

 }
 
  useEffect(()=>{
    fetch(BASE_URL)
    .then(res=>res.json())
    .then(data=> {
      const firstCurrency=Object.keys(data.conversion_rates)[10]
  
      console.log(data);
  
      setCurrencyOptions([data.base_code,...Object.keys(data.conversion_rates)])
      setFromCurrency(data.base_code)
      setTocurrency(firstCurrency);
      setExchangeRate(data.conversion_rates[firstCurrency])
    })
   

  },[])

   function handleFromAmountChanges(e){
     setAmmount(e.target.value)
     setAmmountrFromCurrency(true)

  }
   function handleToAmountChanges(e){
     setAmmount(e.target.value)
     setAmmountrFromCurrency(false)

  }

  return (
   <>
   <h3 className="convert">Converter</h3>
     <Currency currencyOptions={currencyOptions}
     selectedCurrency={fromcurrency}
     onChangeCurrency={e=>setFromCurrency(e.target.value)}
     onChangeAmount={handleFromAmountChanges}
     amount={FromAmmount}
     />
     <h3 className="same" >
       =
     </h3>
     <Currency currencyOptions={currencyOptions}
     selectedCurrency={tocurrency}
     onChangeCurrency={e=>setTocurrency(e.target.value)}
     amount={toAmmount}
     onChangeAmount={handleToAmountChanges}

      />
     
   </>
  );
}

export default App;
