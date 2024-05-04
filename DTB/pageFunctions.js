function toggleCalculateButton() {
  var weaponStyle = document.getElementById("weaponStyle");
  var calculateButton = document.getElementById("calculateButton");

  // Enable the calculate button only if a weapon style has been selected
  calculateButton.disabled = !weaponStyle.value; // Disable if no value is selected
}


$(document).ready(function () {
  fetch("./gunstyles.json")
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      const categorySelect = $("#weaponCategory");
      const styleSelect = $("#weaponStyle");

      // Add default option and disable it
      categorySelect.append($('<option>', { value: '', text: 'Pick one', disabled: true, selected: true }));
      styleSelect.append($('<option>', { value: '', text: 'Pick one', disabled: true, selected: true }));

      // Populate the weapon category dropdown
      for (let category in data) {
          categorySelect.append(new Option(category, category));
      }

      // Initialize both selects with Select2
      categorySelect.select2({ placeholder: "Select a weapon category" });
      styleSelect.select2({ placeholder: "Select a weapon style" }).prop("disabled", true);

      // When a category is selected
      categorySelect.on("change", function () {
          let category = $(this).val();
          styleSelect.empty().prop("disabled", false); // Enable and clear the second dropdown
          styleSelect.append($('<option>', { value: '', text: 'Pick one', disabled: true, selected: true })); // Add default option again

          // Populate the second dropdown based on the first dropdown's value
          data[category].forEach(item => {
              styleSelect.append(new Option(item.frame));
          });

          styleSelect.select2({ placeholder: "Select a weapon style" }); // Reinitialize Select2
      });
  })
  .catch(error => console.error("Error loading the gun styles:", error));

  $("#weaponStyle").on("change", function () {
      var calculateButton = document.getElementById("calculateButton");
      calculateButton.disabled = !this.value; // Enable the calculate button only if a style is selected
  });
});

