// code read done
let allRooms = [];

// load json data
// load json data
const fetchRoomsData = async () => {
  const data = await fetch(`ROOMS.json`);
  const result = await data.json();
  allRooms = result;
  displayRoomsData(result);
};
fetchRoomsData();


// display all data & review range data 
// display all data & review range data 
const displayRoomsData = async (rooms) => {
  const roomsContainer = document.getElementById("rooms-container");
  roomsContainer.innerHTML=''
  rooms.forEach((room) => {
    const { name, summary, property_type, images,number_of_reviews,price,_id } = room;
    roomsContainer.innerHTML += `
 <div class="col">
 <div class="card h-100">
   <img src=${images.picture_url} class="card-img-top " alt="..." style=" height: 300px;
   object-fit: fill;">
   <div class="card-body">
     <h5 class="card-title">${name}</h5>
     <p>Number_of_reviews : ${number_of_reviews}</p>
     <p>Price : ${price.$numberDecimal}</p>
    
     <p class="card-text">${property_type}</p>
     <p class="card-text">${summary}</p>
   </div>
   <button class="btn btn-info btn-lg"  role="button" onclick='addToCart(${_id})'
                >Add to cart</button>
 </div>
</div>
 `;
  });
};

// input range field 
// input range field 
const range = document.getElementById("review-range");
range.addEventListener("input", () => { 
  const value = range.value;
  document.getElementById('review-count').innerText = value
  const filteredData= allRooms.filter( room => room.number_of_reviews >= value)
  displayRoomsData(filteredData) 
});

// sort by date button ascending
// sort by date button ascending
document.getElementById('sort-by-price-btn').addEventListener('click', () =>{
  allRooms.sort((a,b)=>{
      return parseFloat(a.price.$numberDecimal) > parseFloat(b.price.$numberDecimal)  ?  1 : -1;
  })
  displayRoomsData(allRooms);
});

// sort by date button ascending
// sort by date button ascending
document.getElementById('sort-by-data-btn').addEventListener('click', () =>{
  allRooms.sort((a,b)=>{
      // console.log(a.first_review,b.first_review);
      return parseFloat(a.price.$numberDecimal) > parseFloat(b.price.$numberDecimal)  ?  1 : -1;
  })
  displayRoomsData(allRooms);
})