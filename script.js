const categoryContainer = document.getElementById('category-container');
const plantContainer = document.getElementById('plant-container');
const loading = document.getElementById('loading');
const allButton = document.getElementById('allBtn');
const plantModal = document.getElementById('plant_modal');
const addToCard = document.getElementById('addToCard');
const totalAmount = document.getElementById('totalAmount');

const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalCategory = document.getElementById('modal-category');
const modalDes = document.getElementById('modal-des');
const modalPrice = document.getElementById('modal-price');

const showLoading = () => {
    loading.classList.remove("hidden");
    plantContainer.innerHTML = "";
};

const hideLoading = () => {
    loading.classList.add("hidden");
};

const loadCategoryItem = async () => {
    let  res = await  fetch('https://openapi.programming-hero.com/api/categories');
    let data = await res.json();
    displayCategoryItem(data.categories);
};

const loadPlants = async () => {
    showLoading();
    let res = await fetch('https://openapi.programming-hero.com/api/plants');
    let data = await res.json();
    hideLoading();
    displayPlants(data.plants);
};

const displayPlants = (dets) => {
    plantContainer.innerHTML = "";

    dets.forEach(elem => {
        const card = document.createElement('div');
        card.className = 'card bg-base-100 w-48 shadow-sm';
        card.innerHTML = `  <div class="p-2.5 space-y-2">
                                    <!-- Img -->
                                    <figure class="rounded-md">
                                        <img title = ${elem.name} onclick=showPlantModal(${elem.id}) class=" h-30 w-full object-cover"
                                        src="${elem.image}"
                                        alt="${elem.name}" />
                                    </figure>
    
                                    <!-- Info Content -->
                                    <div class="space-y-2.5">
                                        <h4 onclick=showPlantModal(${elem.id}) class="cursor-pointer hover:text-[#15803D] text-[14px] font-semibold">${elem.name}</h4>
                                        <p class="line-clamp-2 text-xs">${elem.description}</p>
    
                                        <div class="flex justify-between">
                                            <div class="badge badge-soft badge-success text-[#15803D] font-semibold rounded-full">Fruit Tree</div>
    
                                            <h3 class="text-[14px] font-semibold">৳${elem.price}</h3>
                                        </div>
                                        
                                    </div>
    
                                    <!-- add card button -->
                                    <div>
                                        <!-- <button class="btn "></button> -->
                                        <button class="btn btn-wide bg-[#15803D] rounded-full text-white h-9" onclick="displayAddToCard('${elem.id}', '${elem.name}', ${elem.price})">Add to Cart</button>
                                    </div>
                            </div>`;
        
        plantContainer.append(card);


    });

    
}

const displayCategoryItem = (dets) => {
    dets.forEach(elem => {
        let btn = document.createElement('button');
        btn.className =  'btn w-full h-8 text-[16px] bg-transparent border-none hover:bg-[#15803D] hover:text-white justify-start px-4';
        btn.innerText = elem.category_name;
        btn.onclick = () => selectCategory(elem.id, btn);
        categoryContainer.append(btn);
    });
};

let cartItems = [];
const displayAddToCard = (id, name, price) => {

    console.log(id, name, price );
    let existingCard = cartItems.find(item => item.id === id);

    if(existingCard) {
        existingCard.quantity += 1;
    } else {
        cartItems.push({
            id,
            name,
            price,
            quantity:1 
        });
    }

    updateCart();
}

function updateCart() {
    addToCard.innerHTML = "";
    console.log(cartItems);
    let total = 0;

    cartItems.forEach(elem => {
        total += elem.price * elem.quantity;

        const div = document.createElement('div');
        div.className = 'flex justify-between p-2 bg-[#F0FDF4] rounded-md';
        div.innerHTML = `<div class="text-[12px]">
                            <h5 class="font-semibold">${elem.name}</h5>
                            <h5 class="text-gray-500 font-medium">৳${elem.price} x ${elem.quantity}</h5>
                        </div>
                        <div onclick="removeAddToCard('${elem.id}')" class="cursor-pointer" ><i class="fa-solid fa-xmark text-[12px] text-gray-400"></i></div>`
                        addToCard.append(div);
    });
        totalAmount.textContent = total;

}


function removeAddToCard(id) {
    let updateCartElem = cartItems.filter(item => item.id !== id);
    cartItems = updateCartElem;
    updateCart();
}

allButton.addEventListener('click', () => {
    const allBtn = categoryContainer.querySelectorAll('button');
    allBtn.forEach(b => {
        b.classList.remove('bg-[#15803D]', 'text-white');
        b.classList.add('bg-transparent');
    });

    allButton.classList.add('bg-[#15803D]', 'text-white');
    allButton.classList.remove('bg-transparent');

    loadPlants();
});

async function selectCategory(id, btn) {
    showLoading();

    const allBtn = categoryContainer.querySelectorAll('button');

    allBtn.forEach(b => {
        b.classList.remove('bg-[#15803D]', 'text-white');
        b.classList.add('bg-transparent');
    });

    btn.classList.add('bg-[#15803D]', 'text-white');
    btn.classList.remove('bg-transparent');

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    hideLoading();
    displayPlants(data.plants);
};

async function showPlantModal(id) {
    plantModal.showModal();

    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    displayModalInfo(data.plants);
};

function displayModalInfo(dets) {
    modalTitle.textContent = dets.name;
    modalImg.src = dets.image;
    modalCategory.textContent = dets.category;
    modalDes.textContent = dets.description;
    modalPrice.textContent = `৳${dets.price}`;

    console.log(dets);

};

loadPlants();
loadCategoryItem();