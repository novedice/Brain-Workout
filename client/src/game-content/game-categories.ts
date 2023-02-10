import { allGames } from './allGames';
const CATEGORIES: string[] = [];

for (let elem of allGames) {
  if (!CATEGORIES.includes(elem.category)) {
    CATEGORIES.push(elem.category);
  }
}

export default CATEGORIES;
