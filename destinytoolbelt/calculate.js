function calculateDamage() {
  Promise.all([fetch('gunstyles.json').then(response => response.json()), fetch('PLMulti.json').then(response => response.json())])
    .then(([gunData, PLMulti]) => {
      const category = document.getElementById('weaponCategory').value
      const style = document.getElementById('weaponStyle').value
      const selectedGun = gunData[category].find(gun => gun.frame === style)

      const activitytype = document.getElementById('activityType').value;
      const activity = document.getElementById('activity').value;
      let PLMultiValue = 14.75;

      const weaponPL = document.getElementById('weaponPL').value;
      const armorPL = document.getElementById('armorPL').value;
      const totalPL = document.getElementById('totalPL').value;
      const difficulty = document.getElementById('difficulty').value;


      try {
        const selectedActivity = PLMulti[activitytype][activity]
        PLMultiValue = parseFloat(selectedActivity["Recommended PL Multiplier"].replace('x', ''))
      } catch {}
    
      if (selectedGun) {
        const frame = selectedGun.value

        const body = parseFloat(selectedGun['crucible body/ explosion'])
        const head = parseFloat(selectedGun['crucible head/ impact'])

        const pveBodyBonus = parseFloat(selectedGun['PvE damage bonus body'].replace('x', '')) || 1
        const pveHeadBonus = parseFloat(selectedGun['PvE damage bonus head'].replace('x', '')) || 1

        const bodyDamage = body * pveBodyBonus * PLMultiValue
        const headDamage = head * pveHeadBonus * PLMultiValue

        if (selectedGun['family'] === 'Rocket Launcher' || selectedGun['family'] === 'Heavy Grenade Launcher' || selectedGun['family'] === 'Special Grenade Launcher')
        {
          document.getElementById('resultDisplay').textContent = `Explosion Damage: ${bodyDamage.toFixed(2)} - Impact Damage: ${headDamage.toFixed(2)}`
        } else {
          document.getElementById('resultDisplay').textContent = `Body Damage: ${bodyDamage.toFixed(2)} - Head Damage: ${headDamage.toFixed(2)}`
        }
      } else {
        document.getElementById('resultDisplay').textContent = 'No data available for the selected weapon style.'
      }
    })
    .catch(error => {
      console.error('Error fetching or processing data:', error)
      document.getElementById('resultDisplay').textContent = 'Error loading data.'
    })
}