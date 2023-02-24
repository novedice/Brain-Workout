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

export const ChooseFavoriteCategory = () => {
  const [favoriteCategories, setFavoriteCategories] = useState<ICategory[]>([]);

  const recieveCategories = async () => {
    let responseCategories = await getCategory();
    console.log('response all categories', responseCategories);

    if (responseCategories?.length) {
      setFavoriteCategories(responseCategories);
      console.log('response all categories', responseCategories);
    }
  };

  const addDeleteFavorites = async (category: string) => {
    let categoryId: number = 0;
    console.log('add - delete category', category);
    if (favoriteCategories?.length) {
      for (let oneCategory of favoriteCategories) {
        if (oneCategory.category === category) {
          categoryId = oneCategory.id;
          break;
        }
      }
    }
    if (categoryId === 0) {
      console.log('create');
      const resCreateCat = await createCategory(category);
      console.log(resCreateCat);
      if (resCreateCat) {
        setFavoriteCategories([...favoriteCategories, resCreateCat]);
        console.log('favorite cat:', favoriteCategories);
      } else {
        console.log('something create got wrong');
      }
    } else {
      console.log('delete');
      const resDelCat = await deleteCategory(categoryId.toString());
      if (resDelCat) {
        return;
      } else {
        console.log('something delete went wrong');
      }
    }
  };

  useEffect(() => {
    recieveCategories();
  }, [favoriteCategories]);

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
                  {/* <p> */}
                  <FormattedMessage id={category} />
                  <img
                    className="checked mr-4 h-[auto] w-[20px]"
                    src="i.png"
                  ></img>
                  {/* </p> */}
                </div>
              </React.Fragment>
            );
          }
        })}
      </div>
    </>
  );
};
