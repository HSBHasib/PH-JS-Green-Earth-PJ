const categoryContainer = document.getElementById('category-container');
const plantContainer = document.getElementById('plant-container');
const loading = document.getElementById('loading');

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
        card.className = 'card bg-base-100 w-50 shadow-sm';
        card.innerHTML = `  <div class="p-2.5 space-y-2">
                                    <!-- Img -->
                                    <figure class="rounded-md">
                                        <img class="h-30 w-full object-cover"
                                        src="${elem.image}"
                                        alt="${elem.name}" />
                                    </figure>
    
                                    <!-- Info Content -->
                                    <div class="space-y-2.5">
                                        <h4 class="text-[14px] font-semibold">${elem.name}</h4>
                                        <p class="line-clamp-2 text-xs">${elem.description}</p>
    
                                        <div class="flex justify-between">
                                            <div class="badge badge-soft badge-success text-[#15803D] font-semibold rounded-full">Fruit Tree</div>
    
                                            <h3 class="text-[14px] font-semibold">৳${elem.price}</h3>
                                        </div>
                                        
                                    </div>
    
                                    <!-- add card button -->
                                    <div>
                                        <!-- <button class="btn "></button> -->
                                        <button class="btn btn-wide bg-[#15803D] rounded-full text-white h-9">Add to Cart</button>
                                    </div>
                            </div>`;
        
        plantContainer.append(card);


    });

    
}

const displayCategoryItem = (dets) => {
    dets.forEach(elem => {
        let btn = document.createElement('button');
        btn.className =  'btn w-full h-8  text-[16px] bg-transparent border-none hover:bg-[#15803D] hover:text-white justify-start px-4';
        btn.innerText = elem.category_name;
        btn.onclick = () => selectCategory(elem.id, btn);
        categoryContainer.append(btn);
    });
};

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
    displayPlants(data.plants);
};



loadPlants();
loadCategoryItem();