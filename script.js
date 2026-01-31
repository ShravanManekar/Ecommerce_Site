document.addEventListener('DOMContentLoaded',()=>{
    const product=[
        {id:1,name:"product 1", price:29.99},
        {id:2,name:"product 2", price:19.99},
        {id:3,name:"product 3", price:59.99},
    ];
const cart =JSON.parse(localStorage.getItem('cart'))||[];


const productList=document.getElementById('product-list');
const cartItems=document.getElementById('cart-items');
const emptyCart=document.getElementById('empty-cart');
const cartTotal=document.getElementById('cart-total');
const totalPrice=document.getElementById('total-price');
const checkoutBtn=document.getElementById('checkout-btn');

product.forEach((product) => {
    const productDiv=document.createElement('div')
    productDiv.classList.add('product')
    productDiv.innerHTML=`
    <span>${product.name} - $${product.price.toFixed(2)} </span>
    <button data-id="${product.id}">Add to cart</button>`;

    productList.appendChild(productDiv);

});
productList.addEventListener('click',(e)=>{
    if(e.target.tagName==='BUTTON'){
        // console.log(typeof e.target.getAttribute('data-id'));
        //  // WE ARE GETTING ID IN STRINGS 
        const productId=parseInt(e.target.getAttribute('data-id'));
      const selectedProduct =  product.find(p=> p.id===productId)
      addTocart(selectedProduct);
      saveTask();

    }
});

function addTocart(Product){
    cart.push(Product);
    renderCart();
    
}

function renderCart(){
    cartItems.innerText="";
    let total=0;

    if(cart.length>0){
        emptyCart.classList.add('hidden');
         cartTotal.classList.remove('hidden');

         cart.forEach((item,index)=>{
            total +=item.price;

           const itemDiv= document.createElement('div');
            itemDiv.innerHTML=` ${item.name} -$${item.price.toFixed(2)};
            <button class="shravan">Remove</button>`;

           const ravan=itemDiv.querySelector('.shravan');
           ravan.addEventListener('click',()=>{
             cart.splice(index,1); //Remove the item from the cart array
               renderCart();
               saveTask(); //Update LocalStorage

           })

              
            
            cartItems.appendChild(itemDiv);
            
             });
            totalPrice.textContent=total.toFixed(2); }
            else{
        emptyCart.classList.remove('hidden');
        cartTotal.classList.add('hidden');
         totalPrice.textContent=`0.00`;
        
    }
      saveTask();
}
checkoutBtn.addEventListener('click',()=>{
    cart.length=0
    alert("Checkout Succesfully");
    renderCart();
});
function saveTask(){
    localStorage.setItem('cart',JSON.stringify(cart));
 }
 renderCart(); 

})