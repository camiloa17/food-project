import React from 'react';
import MealSummary from './MealSummary/MealSummary';
import AvailableMeals from './AvailableMeals/AvailableMeals';

export default function Meals(props) {
  return (
    <React.Fragment>
      <MealSummary />
      <AvailableMeals />
    </React.Fragment>
  );
}
