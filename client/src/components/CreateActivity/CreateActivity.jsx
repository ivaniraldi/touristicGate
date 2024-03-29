import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "../NavBar/navBar";
import swal from 'sweetalert';
import AddActivityView from "./AddActivityView";

import {validate, validateCountries} from "./formValidate.js";

const AddActivity = () => {
  const [InputActivity, setInputActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    changed: false,
  });
  const [errors, setErrors] = useState({});
  const countries = useSelector((state) => state.filterCountries);
  const [InputCountries, setInputCountries] = useState([]);

  useEffect(() => {
    validateCountries(InputCountries, setErrors);
  }, [InputCountries]);

  function handlerOnChange(e) {
    validate(e.target.value, e.target.name, setErrors);

    setInputActivity({
      ...InputActivity,
      [e.target.name]: e.target.value,
    });
  }

  function handlerOnChangeCountries(e) {
    const aux = e.target.value.split(" ");

    let includeCountry = false;
    InputCountries.forEach((e) => {
      if (e.id === aux[0]) {
        includeCountry = true;
      }
    });
    if (!includeCountry) {
      setInputCountries([...InputCountries, { id: aux[0], name: aux[1] }]);
    }
    setInputActivity({
      ...InputActivity,
      changed: true,
    });
  }

  function RemoveCountry(id) {
    const newCountries = InputCountries.filter((e) => e.id !== id);
    setInputCountries(newCountries);
  }

  async function handlerSubmit(e) {
    e.preventDefault();
    const countriesRes = InputCountries.map((e) => e.name);

    const res = {
      name: `${InputActivity.name}`,
      difficulty: InputActivity.difficulty,
      duration: InputActivity.duration,
      season: `${InputActivity.season}`,
      countryName: countriesRes,
    };
    const response = await axios.post("/activity", res);

    if (typeof response.data === "string") {
      swal(response.data);
    } else {
      swal("Activity created.");
      setInputActivity({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
      });
      setInputCountries([]);
    }
  }

  return (
    <div>
      <NavBar />

      <AddActivityView
        errors={errors}
        countries={countries}
        handlerOnChange={handlerOnChange}
        handlerOnChangeCountries={handlerOnChangeCountries}
        handlerSubmit={handlerSubmit}
        RemoveCountry={RemoveCountry}
        InputActivity={InputActivity}
        InputCountries={InputCountries}
      />
    </div>
  );
};

export default AddActivity;
