/* --- كود كاشير محل عبده (مواد غذائية) --- */
let title = document.getElementById('title');
let price = document.getElementById('price');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let category = document.getElementById('category');
let count = document.getElementById('count');
let submit = document.getElementById('submit');

// هنا استخدمنا groceryStore عشان ميتدخلش مع الأجنص
let dataPro = localStorage.groceryStore ? JSON.parse(localStorage.groceryStore) : [];
let mood = 'create';
let tmp;

function getTotal() {
    if (price.value != '') {
        let result = (+price.value - +discount.value);
        total.innerHTML = result;
        total.style.background = '#2e7d32';
    } else {
        total.innerHTML = '0';
        total.style.background = '#a00d02';
    }
}

submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        discount: discount.value || 0,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value,
    };

    if (title.value != '' && price.value != '' && count.value != '') {
        if (mood === 'create') {
            dataPro.push(newPro);
        } else {
            dataPro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create New Product';
        }
        localStorage.setItem('groceryStore', JSON.stringify(dataPro)); // حفظ في مخزن المحل
        clearInputs();
        showData();
    }
}

function showData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td>${dataPro[i].count}</td>
            <td><button onclick="updateData(${i})" id="update">تعديل</button></td>
            <td><button onclick="deleteData(${i})" id="delete">حذف</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    // ... زرار مسح الكل يظهر هنا بنفس المنطق
}

function deleteData(i) {
    if(confirm("حذف المنتج؟")){
        dataPro.splice(i, 1);
        localStorage.groceryStore = JSON.stringify(dataPro);
        showData();
    }
}

function deleteAll() {
    if(confirm("مسح كل سلع المحل؟")){
        localStorage.removeItem('groceryStore');
        dataPro = [];
        showData();
    }
}
showData();