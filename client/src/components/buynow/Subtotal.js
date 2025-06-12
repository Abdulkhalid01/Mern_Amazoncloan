import React, { useEffect, useState } from 'react'

function Subtotal({iteam}) {

  const [price,setPrice] = useState(0)

  useEffect(() =>{
    totalAmount();
  },[iteam])

  const totalAmount = () => {
  let price = 0;
  iteam.map((itm) => {
    price += itm.price.cost;
  });
  setPrice(price)
  return price;
};


  return (
    <div className='sub_item'>
      <h3>Subtotal ({iteam.length}items): <strong style={{fontWeight:700, color:"#111"}}>₹{price}.00</strong></h3>
    </div>
  )
}

export default Subtotal
