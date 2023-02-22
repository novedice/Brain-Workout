// import { useState } from 'react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import CATEGORIES from '../game-content/game-categories';
import { useCategory } from '../hooks/ChooseCategory';
import './GameCategories.css';

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
            <React.Fragment key={category}>
              <label htmlFor={category} className="category hover:bg-red-200">
                <input
                  type="radio"
                  className="categories-input checked:text-red-500"
                  id={category}
                  value={category}
                  name="category"
                  checked={categorySearch === category ? true : false}
                  onChange={() => {
                    onClickCategory(category);
                  }}
                />
                <FormattedMessage id={category} />
              </label>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
