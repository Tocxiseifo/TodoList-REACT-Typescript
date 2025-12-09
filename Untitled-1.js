// type Product = {
//   id: string 
//   name: string;
//   price: number ;
//   quantity: number;
// };

// function ShoppingCart() {
//   const [productTitle , setProductTitle] = useState('')
//   const [productPrice , setProductPrice] = useState('')
//   const [Products , setProducts] = useState<Product[]>([])


//   function handleAddClick() {
//     setProducts([...Products,{
//       id:uuid(),
//       name:productTitle,
//       price:Number(productPrice),
//       quantity:0
//     }])
//   }
//   function handleRemoveClick(id:string) {
//     const upDate = Products.filter(p=> p.id !== id)
//     setProducts(upDate)
//   }
//   const productList = Products.map((p)=>{
//     return (
//     <div key={p.id} style={{display:'flex' , flexDirection:'column'}} >
//      <span> Product name: {p.name}</span>
//       <span>product price: {p.price}</span>
//       <span> product quantity: {p.quantity}</span>
//     </div>
//   )
// })
//   return(
//     <>
//       <label style={{
//         padding:'25px'
//       }}>
//         name of product
//         <input style={{
//           margin:'25px'
//         }} placeholder='name of product'
//         value={productTitle}
//         onChange={(e)=>{
//           setProductTitle(e.target.value)
//         }}
//         />
//         price of product
//         <input placeholder='price of product' value={productPrice} onChange={(e)=>{
//           setProductPrice(e.target.value)
//         }}/>        
//       </label>
//       {Products.map((p)=>{
//         return (
//                     <div key={p.id} style={{display:'flex' , flexDirection:'column'}} >
//                     <span> Product name: {p.name}</span>
//                       <span>product price: {p.price}</span>
//                       <span> product quantity: {p.quantity}</span>
//                 <button onClick={()=>{
//                   if (p.id !== null) handleRemoveClick(p.id)
//                   }}>remove product</button>
//                   </div>
          
//          )
//         })}
//         <button style={{marginRight:'25px'}} disabled={!productTitle || !productPrice} onClick={handleAddClick} >Add product</button>
//     </>
//   )  
// }