import { allGames } from './allGames';

const CATEGORIES: string[] = ['all_categories'];

for (let elem of allGames) {
  if (!CATEGORIES.includes(elem.category)) {
    CATEGORIES.push(elem.category);
  }
}

export default CATEGORIES;
