let dropdownList = document.getElementById("list");
      
      dropdownList.style.display = "none";
      
      function openDropdown() {
         if (dropdownList.style.display != "none") {
            dropdownList.style.display = "none";
         } else {
            dropdownList.style.display = "block";
         }
      }
      
      let portfolio = 'Conservative'
      const p_elements = document.getElementsByTagName("p");
      
      // access all p elements
      const totalP = p_elements.length;
      
      // iterate through all <p> elements
      for (let i = 0; i < totalP; i++) {
      
         const option = p_elements[i];
      
         // add event listner to <p> element
         option.addEventListener("click", () => {
      
            // When a user clicks on any p element, get its innerHTML
            portfolio = option.innerHTML;
            updateCharts(portfolio); // calling the update charts function
            console.log("The selected option is " + portfolio);

         })
      }