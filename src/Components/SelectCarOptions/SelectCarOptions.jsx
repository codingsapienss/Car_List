import { useState } from "react";
import "./selectCarOptions.css";
import availableCarsData from "../../carsData.js";

const SelectCarOptions = () => {
  const [name, setName] = useState("");
  const [carModels, setCarModels] = useState([]);
  const [model, setModel] = useState("");
  const [qty, setQty] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [carsList, setCarsList] = useState([]);

  const handleChange = (e) => {
    let selectedCar = availableCarsData.find((carData) => {
      return carData.carName == e.target.value;
    });

    if (e.target.name == "carName") {
      setName(e.target.value);
      setCarModels(selectedCar?.carModel);
    }

    if (e.target.name == "carModel") {
      setModel(e.target.value);
    }

    if (e.target.id == "qty") {
      // setQty(e.target.value);

      let selectedCar = availableCarsData.find((carData) => {
        return carData.carName == name;
      });

      console.log(selectedCar);

      if (
        selectedCar &&
        parseInt(e.target.value) > parseInt(selectedCar?.qty)
      ) {
        setErrorMsg(
          `Selected Quantity is out of range. Only  ${selectedCar.qty} cars are available.`
        );
        setQty("");
      } else {
        setErrorMsg("");
        setQty(e.target.value);
      }
    }
  };

  const handleAddCar = () => {
    if (name && model && qty) {
      const carExists = carsList.some(
        (car) => car.carModel === model && car.carName === name
      );

      if (carExists) {
        setCarsList((prev) =>
          prev.map((car) =>
            car.carModel == model && car.carName == name
              ? { ...car, qty: parseInt(car.qty) + parseInt(qty) }
              : car
          )
        );
        setName("");
        setModel("");
        setQty("");
        setCarModels([]);
      } else {
        setCarsList([
          ...carsList,
          { carName: name, carModel: model, qty: qty },
        ]);
        setName("");
        setModel("");
        setQty("");
        setCarModels([]);
      }
    }
  };

  return (
    <>
      <div className="selectCarOptions">
        <h1>Add Your Car in the List</h1>

        <div className="input">
          <label htmlFor="carName"> Car Name </label>

          <select
            value={name}
            onChange={handleChange}
            name="carName"
            id="carName"
          >
            <option value="">Select Car Name</option>
            {availableCarsData.map((carData, i) => {
              return (
                <option value={carData.carName} key={i}>
                  {carData.carName}{" "}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input">
          <label htmlFor="carModel">Car Model</label>

          <select
            onChange={handleChange}
            value={model}
            name="carModel"
            id="carModel"
          >
            <option value=""> Select Car Model</option>
            {carModels?.map((selectedModel, i) => {
              return (
                <option key={i} value={selectedModel}>
                  {selectedModel}
                </option>
              );
            })}
          </select>
        </div>

        <div className="input">
          <label htmlFor="qty"> Car Quantity </label>
          <input
            value={qty}
            onChange={handleChange}
            type="number"
            id="qty"
            name="qty"
            placeholder="Enter Car Quantity"
          />

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        </div>

        <button onClick={handleAddCar}>Add Car</button>
      </div>

      {carsList.length > 0 && (
        <div className="carDetailsContaier">
          <div className="singleCarDetail">
            <table>
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Brand Name</th>
                  <th>Model Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              {carsList?.map((car, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <td>{i + 1}.</td>
                      <td>{car?.carName}</td>
                      <td>{car?.carModel} </td>
                      <td>{car?.qty}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectCarOptions;
