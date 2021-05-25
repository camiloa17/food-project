import { useCallback, useEffect, useState } from 'react';
import useFetch from '../../../hooks/use-fetch';
import classes from './AvailableMeals.module.css';
import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';

export default function AvailableMeals() {
  const [meals, setMeals] = useState([]);

  const handleData = useCallback((meals) => {
    const data = [];

    for (const key in meals) {
      data.push({
        id: key,
        name: meals[key].name,
        description: meals[key].description,
        price: meals[key].price,
      });
    }
    setMeals(data);
  }, []);
  const {
    sendRequest: fetchMeals,
    isLoading,
    error,
    abortRequest,
  } = useFetch(handleData);

  useEffect(() => {
    fetchMeals({
      url: 'https://food-app-d0ee8-default-rtdb.firebaseio.com/meals.json',
    });
    return () => {
      abortRequest();
    };
  }, [fetchMeals, abortRequest]);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading ...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }
  const mealList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
}
