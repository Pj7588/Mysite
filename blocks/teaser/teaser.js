export default function decorate(block) {
  // We take the two columns from the table
  const cols = [...block.firstElementChild.children];
  block.classList.add(`teaser-${cols.length}-cols`);

  // Loop through the columns to identify content
  cols.forEach((col) => {
    const pic = col.querySelector('picture');
    if (pic) {
      // It's the image column
      col.classList.add('teaser-image');
    } else {
      // It's the text column
      col.classList.add('teaser-content');
    }
  });
}

alert("TEst");