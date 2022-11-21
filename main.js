document.querySelector(".discription").style.textTransform = "uppercase";
let price = document.getElementById("price");
let adds = document.getElementById("adds");
let Taxes = document.getElementById("taxes");
let discount = document.getElementById("discount");
let x = 1;
let Title = document.getElementById("titlee");
let total = 0;
let Category = document.getElementById("Category");
let Count = document.getElementById("Count");
let create = document.getElementById("create");
let mood = "create";
let tmp;
let search = document.getElementById("Search");
//total price
function getTotal() {
    total = +price.value + +adds.value + +Taxes.value - +discount.value;

    document.getElementById("Total").innerHTML = total;
    document.getElementById("Total").style.backgroundColor = "red";
}

let data;
if (localStorage.products != null) {
    data = JSON.parse(localStorage.products);
} else {
    data = [];
}

function submitFunction() {
    let order = {
        Price: price.value,
        Title: Title.value.toLowerCase(),
        Adds: adds.value,
        Taxes: Taxes.value,
        Discount: discount.value,
        Total: total,
        Count: Count.value,
        Category: Category.value.toLowerCase(),
    };
    console.log(order.Total);
    console.log(order.Adds);


    if (Title.value != "" && Count.value <= 50) {
        if (mood === "create") {
            if (order.Count > 1) {
                for (let i = 0; i < order.Count; i++) {
                    data.push(order);
                }
            } else data.push(order);
        } else {
            data[tmp] = order;
            mood = "create";
            create.innerHTML = "Create";
            create.style.backgroundColor = "purple";
            Count.style.display = "block";
        }
    }

    // store data in localhost
    localStorage.setItem("products", JSON.stringify(data));
    clearData();
    showdata();
    // console.log(data)
}

//clear inputs

function clearData() {
    price.value = "";
    adds.value = "";
    Taxes.value = "";
    discount.value = "";
    Title.value = "";
    document.getElementById("Total").innerHTML = "";
    document.getElementById("Total").style.backgroundColor = "purple";
    Category.value = "";
    Count.value = "";
    price.value = "";
    search.value = "";
}

//Read products
function showdata() {
    let table = "";
    for (let i = 0; i < data.length; i++) {
        table += `
    <tr>
        <th >${i}</th>
        <td>${data[i].Title}</td>
        <td>${data[i].Price}</td>
        <td>${data[i].Taxes}</td>
        <td>${data[i].Adds}</td>
        <td>${data[i].Discount}</td>
        <td>${data[i].Total}</td>
        <td>${data[i].Category}</td>
        <td> <button type="button"onclick="deleteProduct(${i})" class="btn">Delete</button> </td>
        <td> <button type="button"onclick="updateData(${i})" class="btn">Update</button></td>
    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;

    let btnDelete = document.getElementById("DeleteAll");
    btnDelete.innerHTML = ` Delete All [ ${data.length} ]`;
    if (data.length > 0) {
        btnDelete.classList.add("d-block");
        btnDelete.classList.remove("d-none");
    } else {
        btnDelete.classList.remove("d-block");
        btnDelete.classList.add("d-none");
    }
}
showdata();

//deleteAll
function deleteAll() {
    localStorage.clear;
    data.splice(0);
    showdata();
}

// updateProduct
function updateData(n) {
    price.value = data[n].Price;
    adds.value = data[n].Adds;
    Taxes.value = data[n].Taxes;
    discount.value = data[n].Discount;
    Title.value = data[n].Title;
    getTotal();
    create.innerHTML = "Update";
    create.style.backgroundColor = "orange";
    Count.style.display = "none";
    Category.value = data[n].Category;
    mood = "update";
    tmp = n;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

// deleteProduct
function deleteProduct(x) {
    data.splice(x, 1);
    localStorage.products = JSON.stringify(data);
    showdata();
}

//search function
let searchMoood = "title";

function getSearchTitle(id) {
    let search = document.getElementById("Search");
    console.log(id);
    if (id === "SearchTitle") {
        searchMoood = "title";

    } else {
        searchMoood = "category";

    }
    search.placeholder = "Search By " + searchMoood;
    search.focus();
    search.value = ""
    showdata()
    console.log(searchMoood);
}

function searchData(val) {
    let table = "";
    console.log(val);
    for (let i = 0; i < data.length; i++) {
        if ((searchMoood = "title")) {
            console.log(data[i].Title.includes(val.toLowerCase()))
            if (data[i].Title.includes(val.toLowerCase())) {
                table += `
                <tr>
                    <th >${i}</th>
                    <td>${data[i].Title}</td>
                    <td>${data[i].Price}</td>
                    <td>${data[i].Taxes}</td>
                    <td>${data[i].Adds}</td>
                    <td>${data[i].Discount}</td>
                    <td>${data[i].Total}</td>
                    <td>${data[i].Category}</td>
                    <td> <button type="button"onclick="deleteProduct(${i})" class="btn">Delete</button> </td>
                    <td> <button type="button"onclick="updateData(${i})" class="btn">Update</button></td>
                </tr>`;
            }

        } else {

            if (data[i].Category.includes(val.toLowerCase())) {
                table += `
            <tr>
                <th >${i}</th>))
                <td>${data[i].Title}</td>
                <td>${data[i].Price}</td>
                <td>${data[i].Taxes}</td>
                <td>${data[i].Adds}</td>
                <td>${data[i].Discount}</td>
                <td>${data[i].Total}</td>
                <td>${data[i].Category}</td>
                <td> <button type="button"onclick="deleteProduct(${i})" class="btn">Delete</button> </td>
                <td> <button type="button"onclick="updateData(${i})" class="btn">Update</button></td>
            </tr>`;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

// style animation
const els = document.querySelectorAll(".inputs");
els.forEach((el) => {
    el.addEventListener("focus", (event) => {
        event.target.style.transform = "scalex(1.1)";
    });
});
els.forEach((el) => {
    el.addEventListener("blur", (event) => {
        event.target.style.transform = "scalex(1)";
    });
});