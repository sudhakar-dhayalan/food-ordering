import { useEffect, useState } from "react";

import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-food-ordering-450e8-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok) {
        throw new Error('Something went wrong');
      }

      const mealsResponse = await response.json();
      const loadedMeals = [];

      for (let key in mealsResponse) {
        loadedMeals.push({
          id: key,
          name: mealsResponse[key].name,
          description: mealsResponse[key].description,
          price: mealsResponse[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error);
    });
  }, []);

  if(httpError) {
    return (
      <section className={classes["http-error"]}>
        <p>Something went wrong</p>
      </section>
    );
  }
  if (isLoading) {
    return (
      <section className={classes["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
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
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
