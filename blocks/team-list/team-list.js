export default async function decorate(block) {
  // 1. Fetch the data
  const resp = await fetch('/team.json');
  if (!resp.ok) return;
  const json = await resp.json();

  // This variable is now "scoped" to this entire function
  const allTeamMembers = json.data;

  // 2. Build the HTML structure
  block.innerHTML = `
    <div class="team-search-wrapper">
      <input type="text" placeholder="Search team members..." id="team-search">
    </div>
    <div class="team-cards-container"></div>
  `;

  const cardContainer = block.querySelector('.team-cards-container');
  const searchInput = block.querySelector('#team-search');

  // 3. Define the internal function to draw cards
  const renderCards = (members) => {
    cardContainer.innerHTML = '';
    members.forEach((row) => {
      const card = document.createElement('div');
      card.classList.add('team-card');
      card.innerHTML = `
        <h3>${row.Name}</h3>
        <p>${row.Role}</p>
      `;
      cardContainer.append(card);
    });
  };

  // 4. Initial Load
  renderCards(allTeamMembers);

  // 5. The Event Listener (This now has access to allTeamMembers)
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allTeamMembers.filter((m) =>
      m.Name.toLowerCase().includes(term) || m.Role.toLowerCase().includes(term)
    );
    renderCards(filtered);
  });
}