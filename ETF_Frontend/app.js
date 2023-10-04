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
