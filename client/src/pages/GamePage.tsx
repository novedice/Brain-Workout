import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GameCategories } from '../components/GameCategories';
import { allGames } from '../game-content/allGames';

export function GamePage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const filteredGames = () => {
    let filtGames = allGames;
    if (category !== 'all_categories' && category) {
      filtGames = allGames.filter((game) => game.category === category);
    }
    return filtGames;
  };

  return (
    <>
      <div className="wrap m-3 flex h-full">
        <aside className="width-[20%] mr-5 border">
          <GameCategories />
        </aside>

        <main className="flex w-[80%] flex-col justify-around">
          <div className="flex flex-wrap justify-around">
            {filteredGames().map((game) => {
              return (
                <React.Fragment key={game.path}>
                  <div className="m-5 flex items-center justify-center border p-3">
                    <div className="all-games-wrap">
                      <Link to={`/games/${game.path}`}>
                        <p>{game.name}</p>
                        <p>{game.categoryName}</p>
                      </Link>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
