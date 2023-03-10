import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, useSearchParams } from 'react-router-dom';
import { GameCategories } from '../components/GameCategories';
import { allGames } from '../game-content/allGames';
import CATEGORIES from '../game-content/game-categories';
import './gamePage1.css';

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
      <div className="game-page">
        <div className="game-page-container">
          <aside className="aside-nav-game">
            <GameCategories />
          </aside>

          <main className="">
            <div className="games-info">
              <div className="h2-category upper-case">
                <img
                  className="category-image"
                  src={
                    category
                      ? CATEGORIES.filter(
                          (categ) => categ.category === category
                        )[0].src
                      : CATEGORIES[0].src
                  }
                  alt={category ? category : 'all_categories'}
                />
                <FormattedMessage id={category ? category : 'all_categories'} />
              </div>

              <div className="game-contant flex flex-wrap justify-center">
                {filteredGames().map((game) => {
                  return (
                    <React.Fragment key={game.path}>
                      <Link to={`/games/${game.path}`}>
                        <div className="game-small ">
                          <div className="all-games-wrap">
                            <img
                              className="game-image-small"
                              src={game.srcEn}
                              alt={game.path}
                            />
                            <p className="upper-case name-of-game">
                              {game.name}
                            </p>
                            <p className="text-cursive">{game.categoryName}</p>
                          </div>
                        </div>
                      </Link>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
