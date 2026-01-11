export default async function decorate(block) {
  const resp = await fetch('/team.json');
  const json = await resp.json();
  const allTeamMembers = json.data; // Store the full list here

  // 1. Create the Search Input
  const searchContainer = document.createElement('div');
  searchContainer.classList.add('team-search-wrapper');
  searchContainer.innerHTML = '<input type="text" placeholder="Search team members..." id="team-search">';

  // 2. Create a container for the cards
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('team-cards-container');

  // 3. Clear the block and add our new elements
  block.textContent = '';
  block.append(searchContainer, cardContainer);
}
const renderCards = (members) => {
  cardContainer.innerHTML = ''; // Clear existing cards
  members.forEach((row) => {
    const card = document.createElement('div');
    card.classList.add('team-card');
    card.innerHTML = `<h3>${row.Name}</h3><p>${row.Role}</p>`;
    cardContainer.append(card);
  });
};

// Initial render of all members
renderCards(allTeamMembers);

// 4. Add the Filter Listener
const input = searchContainer.querySelector('input');
input.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  // THE MAGIC: filter creates a new list based on your search
  const filteredList = allTeamMembers.filter((member) =>
    member.Name.toLowerCase().includes(searchTerm) ||
    member.Role.toLowerCase().includes(searchTerm)
  );

  renderCards(filteredList); // Redraw with only the matching members
});