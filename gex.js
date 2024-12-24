const inputEl = document.getElementById("input-el");
const saveEl = document.getElementById("save-el");
const tabEl = document.getElementById("tab-el");
const deleteBtn = document.getElementById("delete-el");
const ansEl = document.getElementById("ans-el");
let listItems = [];
let internalStorageItems = JSON.parse(localStorage.getItem("myleads"));

function renderItems(items) {
    let blabla = "";
    for (let i = 0; i < items.length; i++) {
        blabla += `
        <li>
            <a target="_blank" href="${items[i]}">${items[i]}</a>
        </li>`;
    }
    ansEl.innerHTML = blabla;
}

if (internalStorageItems) {
    listItems = internalStorageItems;
    renderItems(listItems);
}

tabEl.addEventListener("click", function () {    
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        listItems.push(tabs[0].url);
        localStorage.setItem("myleads", JSON.stringify(listItems));
        renderItems(listItems);
    });
});

deleteBtn.addEventListener("dblclick", function () {
    listItems = [];
    localStorage.clear();
    renderItems(listItems);
});

saveEl.addEventListener("click", function () {
    if (inputEl.value.trim() !== "") {
        listItems.push(inputEl.value.trim());
        inputEl.value = "";
        localStorage.setItem("myleads", JSON.stringify(listItems));
        renderItems(listItems);
    }
});
