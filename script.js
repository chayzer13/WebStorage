function updateTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ''; 

    const currentStorage = getStorage();

    if (!currentStorage || Object.keys(currentStorage).length === 0) {
        
        const emptyRow = document.createElement('tr');
        const emptyHeader = document.createElement('td');
        emptyHeader.setAttribute('colspan', '3');
        emptyHeader.textContent = 'Нет данных в хранилище';
        emptyRow.appendChild(emptyHeader);
        tableBody.appendChild(emptyRow);
    } else {
        
        for (const [key, value] of Object.entries(currentStorage)) {
            const row = document.createElement('tr');
            const keyCell = document.createElement('td');
            keyCell.textContent = key;
            const valueCell = document.createElement('td');
            valueCell.textContent = value;
            const deleteCell = document.createElement('td');
            const deleteSpan = document.createElement('span');
            deleteSpan.textContent = 'X';
            deleteSpan.style.cursor = 'pointer';
            deleteSpan.onclick = () => deleteItem(key); 
            deleteCell.appendChild(deleteSpan);
            row.appendChild(keyCell);
            row.appendChild(valueCell);
            row.appendChild(deleteCell);
            tableBody.appendChild(row);
        }
    }
}


window.onload = updateTable;


function getStorage() {
    return localStorage; 
}


function saveItem() {
    const key = document.getElementById('keyInput').value;
    const value = document.getElementById('valueInput').value;

    if (key && value) {
        localStorage.setItem(key, value); 
        updateTable(); 
    } else {
        alert('Ключ и значение не могут быть пустыми');
    }
}


function deleteItem(key) {
    const confirmation = confirm("Вы уверены, что хотите удалить эту запись?");
    if (confirmation) {
        localStorage.removeItem(key); 
        updateTable(); 
    }
}


function clearStorage() {
    const confirmation = confirm("Вы уверены, что хотите полностью очистить локальное хранилище?");
    if (confirmation) {
        localStorage.clear(); 
        updateTable(); 
    }
}
