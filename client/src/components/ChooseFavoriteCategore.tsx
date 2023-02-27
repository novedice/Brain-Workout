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
import { useAppDispatch } from '../hooks/useTypeSelector';
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORIES } from '../constants';

export const ChooseFavoriteCategory = () => {
  const [favoriteCategories, setFavoriteCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const recieveCategories = async () => {
    const responseCategories = await getCategory();
    if (responseCategories?.length) {
      setFavoriteCategories(responseCategories);
      dispatch({ payload: responseCategories, type: UPDATE_CATEGORIES });
    }
  };

  const addDeleteFavorites = async (category: string) => {
    setError('');
    let categoryId: number = 0;
    let choosenCategory = '';
    if (favoriteCategories?.length) {
      for (let oneCategory of favoriteCategories) {
        if (oneCategory.category === category) {
          categoryId = oneCategory.id;
          choosenCategory = oneCategory.category;
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
          dispatch({ payload: resCreateCat.category, type: ADD_CATEGORY });
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
        dispatch({ payload: choosenCategory, type: DELETE_CATEGORY });
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
          if (category.category !== 'all_categories') {
            return (
              <React.Fragment key={category.category}>
                <div
                  className={`category-in-favorites upper-case ${
                    favoriteCategories
                      ?.map((icat) => icat.category)
                      .includes(category.category)
                      ? 'choosen-category'
                      : ''
                  }`}
                  onClick={() => addDeleteFavorites(category.category)}
                >
                  <FormattedMessage id={category.category} />
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
