export default async function decorate(block) {
  // 1. Fetch the data from your spreadsheet (JSON)
  const resp = await fetch('/sheetdata.json');
  const json = await resp.json();

  // 2. Clear the "Loading" state
  block.textContent = '';

  // 3. Loop through the data and create HTML
  json.data.forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('team-card');
    card.innerHTML = `
      <div class="team-info">
        <h3>${row.Name}</h3>
        <p>${row.Role}</p>
      </div>
    `;
    block.append(card);
  });
}