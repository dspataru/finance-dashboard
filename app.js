const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
});


const buildTableBody = () => {
    const recentOrderData = RECENT_ORDER_DATA;
  
    const tbody = document.createElement("tbody");
  
    let bodyContent = "";
    for (const row of recentOrderData) {
      bodyContent += `
        <tr>
          <td>${row.productName}</td>
          <td>${row.productNumber}</td>
          <td>${row.payment}</td>
          <td class="${row.statusColor}">${row.status}</td>
          <td class="primary">Details</td>
        </tr>
      `;
    }
  
    tbody.innerHTML = bodyContent;

    return tbody;
};

// Document operation functions
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Show Sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Hide Sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change Theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});


