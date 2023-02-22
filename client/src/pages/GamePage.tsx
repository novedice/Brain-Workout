import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GameCategories } from '../components/GameCategories';
import { allGames } from '../game-content/allGames';
import './GamePage.css';

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
      <div className="game-page__container wrap flex h-full justify-center p-3">
        <aside className="width-[20%] game-aside mr-14">
          <GameCategories />
        </aside>

        <main className="game-main flex w-[70%] flex-col justify-around">
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
