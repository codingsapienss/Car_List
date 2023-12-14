import { useState } from "react";
import "./AddCar.css";

const AddCar = () => {
  const [carDetail, setCarDetail] = useState({ brand: "", model: "", qty: "" });
  const [carsList, setCarsList] = useState([
    // { brand: "Maruti", model: "jhj", qty: 4 },
    // { brand: "Tesla", model: "jhj", qty: 4 },
    // { brand: "Hsh", model: "jhj", qty: 4 },
    // { brand: "Mardfgduti", model: "jhj", qty: 4 },
    // { brand: "Mardfguti", model: "jhj", qty: 4 },
  ]);

  console.log(carsList);

  console.log(carDetail);

  const handleAddCar = () => {
    if (carDetail.brand && carDetail.model && carDetail.qty) {
      const carExists = carsList.some(
        (car) => car.model === carDetail.model && car.brand === carDetail.brand
      );

      if (carExists) {
        setCarsList((prev) =>
          prev.map((car) =>
            car.model === carDetail.model && car.brand === carDetail.brand
              ? { ...car, qty: parseInt(car.qty) + parseInt(carDetail.qty) }
              : car
          )
        );
      } else {
        setCarsList([...carsList, carDetail]);
      }
    }
  };

  return (
    <>
      <div className="addCarContainer">
        <h2>Add Your Car in the List</h2>

        <div className="input">
          <label htmlFor="brand"> Car Brand </label>
          <input
            value={carDetail.brand}
            type="text"
            onChange={(e) => {
              setCarDetail({ ...carDetail, brand: e.target.value });
            }}
            id="brand"
            placeholder="Car's brand name"
          />
        </div>
        <div className="input">
          <label htmlFor="model"> Car Model</label>
          <input
            value={carDetail.model}
            onChange={(e) => {
              setCarDetail({ ...carDetail, model: e.target.value });
            }}
            type="text"
            id="model"
            placeholder="Car's Model No."
          />
        </div>
        <div className="input">
          <label htmlFor="qty"> Quantity </label>
          <input
            value={carDetail.qty}
            onChange={(e) => {
              setCarDetail({ ...carDetail, qty: e.target.value });
            }}
            type="number"
            id="qty"
            placeholder="Car's Quantity"
          />
        </div>

        <button onClick={handleAddCar}>Add Car</button>
      </div>

      {carsList.length > 0 && (
        <div className="carDetailsContaier">
          {carsList?.map((car, i) => {
            return (
              <div className="singleCarDetail" key={car.model}>
                {" "}
                {i + 1}. Car Brand : {car.brand} , Car Model : {car.model} ,
                Quantity ; {car.qty}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AddCar;
