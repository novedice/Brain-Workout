import { allGames } from './allGames';
import '../assets/categories-pics/flexibility.jpeg';
import '../assets/categories-pics/speed.jpeg';
import '../assets/categories-pics/memory.jpeg';
import '../assets/categories-pics/problem_solving.jpeg';
import '../assets/categories-pics/all_categories.png';

const CATEGORIES: { category: string; src: string }[] = [
  { category: 'all_categories', src: 'all_categories.png' },
];

for (let elem of allGames) {
  if (
    !CATEGORIES.map((oneCategory) => oneCategory.category).includes(
      elem.category
    )
  ) {
    CATEGORIES.push({ category: elem.category, src: `${elem.category}.jpeg` });
  }
}

export default CATEGORIES;
