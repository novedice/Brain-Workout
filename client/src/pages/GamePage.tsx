import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { GameCategories } from '../components/GameCategories';
// import { MeaningColorGame } from '../components/Games/meaningColor';
// import { Template } from '../components/Template';
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
      <div className="m-3 flex h-full ">
        <aside className="width-[20%] mr-5 border">
          <GameCategories />
        </aside>
        <main className="flex w-[80%] flex-col justify-around">
          <div className="flex flex-wrap justify-around">
            {/* <Template /> */}
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
          <Link to="/game/MeaningColorGame">Game!</Link>
          {/* <MeaningColorGame /> */}
        </main>
      </div>
    </>
  );
}
