import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import {
  createCategory,
  deleteCategory,
  getCategory,
} from '../api/category-requests';
import CATEGORIES from '../game-content/game-categories';
import { ICategory } from '../types/interfaces';
import '../assets/i.png';
import { styleErrorMes } from '../constants/styleConstants';

export const ChooseFavoriteCategory = () => {
  const [favoriteCategories, setFavoriteCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState('');

  const recieveCategories = async () => {
    const responseCategories = await getCategory();
    if (responseCategories?.length) {
      setFavoriteCategories(responseCategories);
    }
  };

  const addDeleteFavorites = async (category: string) => {
    setError('');
    let categoryId: number = 0;
    if (favoriteCategories?.length) {
      for (let oneCategory of favoriteCategories) {
        if (oneCategory.category === category) {
          categoryId = oneCategory.id;
          break;
        }
      }
    }
    if (categoryId === 0) {
      if (favoriteCategories.length < 2) {
        const resCreateCat = await createCategory(category);
        console.log(resCreateCat);
        if (resCreateCat) {
          setFavoriteCategories([...favoriteCategories, resCreateCat]);
          console.log('favorite cat:', favoriteCategories);
        } else {
          console.log('something create got wrong');
        }
      } else {
        setError('category_error');
      }
    } else {
      console.log('delete');
      const resDelCat = await deleteCategory(categoryId);
      if (resDelCat) {
        setFavoriteCategories(
          favoriteCategories.filter((cat) => cat.id !== categoryId)
        );
        return;
      } else {
        console.log('something delete went wrong');
      }
    }
  };

  useEffect(() => {
    recieveCategories();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <p className="mb-10">
          <FormattedMessage id="choose_favorite_categories" />
        </p>
        {CATEGORIES.map((category) => {
          if (category !== 'all_categories') {
            return (
              <React.Fragment key={category}>
                <div
                  className={`category-in-favorites upper-case ${
                    favoriteCategories
                      ?.map((icat) => icat.category)
                      .includes(category)
                      ? 'choosen-category'
                      : ''
                  }`}
                  onClick={() => addDeleteFavorites(category)}
                >
                  <FormattedMessage id={category} />
                  <img
                    className="checked mr-4 h-[auto] w-[20px]"
                    src="i.png"
                  ></img>
                </div>
              </React.Fragment>
            );
          }
        })}
        {error && (
          <div className={styleErrorMes}>
            <FormattedMessage id={error} />
          </div>
        )}
      </div>
    </>
  );
};
