
// product add to localStorage 
const addToCart = async (id) => {
  const data = await fetch(`ROOMS.json`);
  const result = await data.json();
  const { name, summary, property_type, images,number_of_reviews,price,_id} = result.find((item) => item._id == id);
  
  const cartItems = getItemsFromStorage();  
  if(cartItems.find(cart => cart._id == id)){
    return;
  }
  cartItems.push({ name, summary, property_type, images,number_of_reviews,price,_id});
  localStorage.setItem('saved-cart', JSON.stringify(cartItems));
  
  displayCartItems();
};


// get from local storage 
const getItemsFromStorage = () => {
  let itemsArray = [];
  const cartItems = localStorage.getItem('saved-cart');
  if (cartItems) {
    itemsArray = JSON.parse(cartItems);
  }
  return itemsArray;
};



// display cart item
const displayCartItems = ()=>{
    const cartItemsContainer = document.getElementById("cart-items");
    const cartItems = getItemsFromStorage();
    // console.log(cartItems)
    cartItemsContainer.innerHTML = ""
    cartItems?.forEach((item)=>{
        const { name, property_type, images,number_of_reviews,price,_id}=item
        cartItemsContainer.innerHTML += `
        <tr>
        <th scope="row">${name.slice(0,26)}</th>
        <td><span> <i onclick='deleteItemFromCart(${_id})' class="mx-2 bi bi-trash3 text-danger"></i>
        </span> 
        <span> 
        <i class="text-success bi bi-credit-card-fill" onclick='handlePaymentInfo(${_id})' data-bs-toggle="modal" data-bs-target="#paymentModal" ></i> 
        </span></td>
       
        </tr>
       
        `
    })
   
}
displayCartItems()

// delete from local storage 
const deleteItemFromCart=(id)=>{
    console.log(id);
    const cartItems = getItemsFromStorage();
    const filteredItems = cartItems.filter((item)=> item._id != id);
    console.log(filteredItems);
    localStorage.setItem('saved-cart', JSON.stringify(filteredItems))
    displayCartItems()
}
