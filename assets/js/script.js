const title = ["Saw", "Hammer", "Spring", "Screw"];
// Example usage
const startDate = "2025-01-01"; // Start date
const endDate = Date.now();   // End date


// Sample data for the table
const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
    Offer_Title: title[Math.floor(Math.random() * title.length)],
    rewardPoints: Math.floor(Math.random() * 50) + 5,
    randomDate: getRandomDate(startDate, endDate),
    
}));

function getRandomDate(startDate, endDate) {
    // Ensure startDate and endDate are Date objects
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    // Generate a random timestamp between start and end
    const randomTimestamp = Math.floor(Math.random() * (end - start + 1)) + start;

    // Convert the timestamp to a Date object and return only the date part
    const randomDate = new Date(randomTimestamp);
    return randomDate.toISOString().split('T')[0];
}

let currentPage = 1;
let entriesPerPage = 5;

function updateTable(page) {
    console.log(page);

    entriesPerPage = parseInt(document.getElementById("entriesPerPage").value);
    currentPage = 1; // Reset to first page
    renderTable(page);
    renderPagination(page);
}
updateTable(page);

function renderTable(page) {
    const tbody = document.getElementById("dataTable").querySelector("tbody");
    tbody.innerHTML = "";

    const filteredData = filterData(data);
    const start = (currentPage - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    const currentData = filteredData.slice(start, end);

    currentData.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.rewardPoints}</td>
        <td>
            ${page === 'redeem'
                ? `${item.Offer_Title}`
                : `${page === 'index'
                    ? `<div class="d-flex justify-content-evenly">
                            <a href="update-mistri.html"><button class="btn btn-primary" >Edit</button></a>
                            <a href="#"><button class="btn btn-danger">Delete</i></button></a>
                      </div`

                    : page === 'point'
                        ? `<button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#verticalycentered"><i class="ri-add-circle-fill"></i> Add Point</button>`
                        : page === 'withdraw'
                            ? `${item.Offer_Title}`
                            : ``
                }`
            }
        </td>
        <td>
            ${page === 'redeem'
                ? ` <div class="d-flex justify-content-evenly">
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AcceptModel">Yes</button></a> 
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#DeniedModel">No</button>
                    </div>`
                : page === 'withdraw'
                    ? `${item.randomDate}`
                    : ``
            }

        </td>

        
      
    `;
        tbody.appendChild(row);
    });
}

function renderPagination(page) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const filteredData = filterData(data);
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "pagination-button btn btn-outline-light  py-1 px-2";
        if (i === currentPage) button.style.fontWeight = "bold";
        button.style.backgroundColor = "#056358"; // Green background
        button.style.color = "white"; // White text
        button.addEventListener("click", () => {
            currentPage = i;
            renderTable(page);
            renderPagination(page);
        });
        pagination.appendChild(button);
    }
}

function searchTable(page) {
    currentPage = 1; // Reset to first page
    renderTable(page);
    renderPagination(page);
}

function filterData(data) {
    const searchQuery = document.getElementById("searchInput").value.toLowerCase();
    return data.filter(item =>
        Object.values(item).some(value =>
            value.toString().toLowerCase().includes(searchQuery)
        )
    );
}

// Initial rendering

function login(){
    const email = document.getElementById("inputEmail").value
    const password = document.getElementById("inputPassword").value
    const emailid = "admin@gmail.com"
    const passWord = "admin123";
    if(emailid === email && passWord === password){
        window.location.href = "index.html";
    }else{
        alert("Invalid credentials")
    }
}
