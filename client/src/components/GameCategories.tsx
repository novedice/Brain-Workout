// import { useState } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import CATEGORIES from '../game-content/game-categories';
import { useCategory } from '../hooks/ChooseCategory';

export function GameCategories() {
  const { updateSearchParams } = useCategory();

  const onClickCategory = (category: string) => {
    updateSearchParams('category', category);
  };

  const [searchParams] = useSearchParams();
  const categorySearch = searchParams.get('category');

  return (
    <>
      <div className="flex flex-col">
        {CATEGORIES.map((category) => {
          return (
            <React.Fragment key={category.category}>
              <div
                className={` ${
                  categorySearch === category.category ? 'open-now' : ''
                }`}
              >
                <label
                  htmlFor={category.category}
                  className="upper-case aside-nav-game-list"
                >
                  <input
                    type="radio"
                    className="input-radio  checked:text-red-500 "
                    id={category.category}
                    value={category.category}
                    name="category"
                    checked={
                      categorySearch === category.category ? true : false
                    }
                    onChange={() => {
                      onClickCategory(category.category);
                    }}
                  />
                  <FormattedMessage id={category.category} />
                </label>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
