import { useEffect } from "react";
import Characteristic from "../components/characteristic/Characteristic";
import Contacts from "../components/contacts/Contacts";
import Home from "../components/home/Home";

function Main() {
  useEffect(function () {
    document.title = "HEALTH pharmacy";
  }, []);

  return (
    <>
      <Home />
      <Characteristic />
      <Contacts />
    </>
  );
}

export default Main;
