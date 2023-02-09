import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { GameCategories } from '../components/GameCategories';
import { MemoryGame } from '../components/MemoryGame/MemoryGame';
import { allGames } from '../game-content/allGames';

export function GamePage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  const filteredGames = () => {
    let filtGames = allGames;
    if (category !== 'All categories' && category) {
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
        <main>
          <div className="flex w-[145%] justify-around">
            {filteredGames().map((game) => {
              return (
                <React.Fragment key={game.name}>
                  <div>
                    <p>{game.name}</p>
                    <p>{game.category}</p>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div>
            <MemoryGame />
          </div>
        </main>
      </div>
    </>
  );
}
