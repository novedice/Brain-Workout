import { useContext, useEffect } from 'react';
// import { useState, useEffect } from 'react';
import axios from 'axios';
// import React from 'react';
import { ICars } from '../types/types';
import { CARNAMES, CARMODELS } from '../constants/constants';
import { CarContext } from '../context/CarContext';
// import { CarContext } from '../App';
// import { CarContext } from '../context/CarContext';

export function useCars() {
  // const [cars, setCars] = useState<ICars[]>([]);
  const { cars, setCars } = useContext(CarContext);

  function addCar(car: ICars) {
    setCars((prev) => [...prev, car]);
  }

  function randomInteger(min: number, max: number) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  function addCarArray() {
    // for (let index = 0; index < 10; index++) {

    const randomName = `${CARNAMES[randomInteger(0, 8)]} ${
      CARMODELS[randomInteger(0, 8)]
    }`;
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    // eslint-disable-next-line @typescript-eslint/no-loop-func
    setCars((prev) => {
      let maxIndex = prev.reduce((acc, obj) => (obj.id > acc.id ? obj : acc));
      return [
        ...prev,
        { name: randomName, color: randomColor, id: maxIndex.id + 1 },
      ];
    });
    // return { randomName, randomColor };
    // }
  }

  // let constr = addCarArray();
  // console.log(constr);

  const deleteCar = async (id: number) => {
    // try {
    const response = await axios.delete(`http://127.0.0.1:3000/garage/${id}`);
    return response.data;
    // } catch (errors) {
    //   console.error(errors);
    // }
  };

  const removeCar = async (index: number) => {
    setCars([...cars.slice(0, index), ...cars.slice(index + 1)]);
    let id = cars[index].id;
    await deleteCar(id);
  };

  // function getValue() {
  //   return cars.reduce((res, car) => (car.id === 6 ? car.name : res), '');
  // }

  // function getValue(index: number) {
  //   return cars.reduce((res, car) => (car.id === index ? car.name : res), '');
  // }

  function changeItem(car: ICars) {
    setCars(
      cars.map((note) => {
        if (note.id === car.id) {
          return car;
        } else {
          return note;
        }
      })
    );
  }

  async function fetchCars() {
    const response = await axios.get<ICars[]>(
      'http://127.0.0.1:3000/garage?_page=1&_limit=20'
    );
    setCars(response.data);
  }
  useEffect(() => {
    fetchCars();
  }, []);

  return { addCar, removeCar, changeItem, addCarArray };
}
