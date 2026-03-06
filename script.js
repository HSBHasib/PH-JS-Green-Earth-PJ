const categoryContainer = document.getElementById('category-container');

let loadCategoryItem = async () => {
    let  res = await  fetch('https://openapi.programming-hero.com/api/categories');
    let data = await res.json();
    displayCategoryItem(data.categories);
};

let displayCategoryItem = (dets) => {
    

    dets.forEach(elem => {
        let button = document.createElement('button');
        button.className =  'btn w-full h-8  text-[16px] bg-transparent border-none hover:bg-[#15803D] justify-start px-4';
        button.innerText = elem.category_name;
        categoryContainer.append(button);
    });
};

// displayCategoryItem();
loadCategoryItem();