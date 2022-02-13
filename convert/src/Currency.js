import React from "react";
import "./styles/style.css";

export default function Currency(props) {
  const { currencyOptions
     ,selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount

} = props;

  return (
    <div className="currency">
      <input type="number" placeholder="Enter the price" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((opt,index) => (
          <option value={opt} key={index}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
