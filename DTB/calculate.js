function calculateDamage () {
  // Fetch both the gun styles and PvE bonus data
  Promise.all([fetch('ryangehan.com/DTB/gunstyles.json').then(response => response.json())])
    .then(([gunData]) => {
      // Get the selected category and style from the dropdowns
      const category = document.getElementById('weaponCategory').value
      console.log(category)
      const style = document.getElementById('weaponStyle').value
      console.log(style)

      // Find the selected gun style within the selected category
      const selectedGun = gunData[category].find(gun => gun.frame === style)

      if (selectedGun) {
        const frame = selectedGun.value
        console.log(frame)

        // Grab damage values and parse them as floats
        const body = parseFloat(selectedGun['crucible body/ explosion'])
        const head = parseFloat(selectedGun['crucible head/ impact'])

        // Grab bonus values, parse them, and default to 1 if not available (assuming 'x' is included like "1.000x")
        const pveBodyBonus =
          parseFloat(selectedGun['PvE damage bonus body'].replace('x', '')) || 1
        const pveHeadBonus =
          parseFloat(selectedGun['PvE damage bonus head'].replace('x', '')) || 1

        // Calculate total damage
        const bodyDamage = body * pveBodyBonus
        const headDamage = head * pveHeadBonus

        // Display the result
        if (
          selectedGun['family'] === 'Rocket Launcher' ||
          selectedGun['family'] === 'Heavy Grenade Launcher' ||
          selectedGun['family'] === 'Special Grenade Launcher'
        ) {
          document.getElementById(
            'resultDisplay'
          ).textContent = `Explosion Damage: ${bodyDamage.toFixed(
            2
          )} - Impact Damage: ${headDamage.toFixed(2)}`
        } else {
          document.getElementById(
            'resultDisplay'
          ).textContent = `Body Damage: ${bodyDamage.toFixed(
            2
          )} - Head Damage: ${headDamage.toFixed(2)}`
        }
      } else {
        document.getElementById('resultDisplay').textContent =
          'No data available for the selected weapon style.'
      }
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error)
      document.getElementById('resultDisplay').textContent =
        'Error loading data.'
    })
}
