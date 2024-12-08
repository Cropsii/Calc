import React, { useState } from "react";
import Button from "./components/Button";

export default function App() {
  const [value, setValue] = useState("0");
  const [temp, setTemp] = useState(0);
  const [operatorIndex, setOperatorIndex] = useState(null);

  // Функция для обработки ввода
  function handleInputChange(inputValue) {
    if (/^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      setValue(inputValue);
    }
  }

  // Обработчик кнопки числа
  function HandlePress(num) {
    if (value === "0") {
      setValue(num.toString());
    } else {
      setValue(value + num.toString());
    }
  }

  // Очистка значений
  function HandleClear() {
    setValue("0");
    setTemp(0);
    setOperatorIndex(null);
  }

  // Добавление точки
  function HandleMark() {
    if (value.includes(".")) {
      return;
    }
    setValue(value + ".");
  }

  // Запоминание текущего значения и оператора
  function HandleOperator(operatorIndex) {
    setOperatorIndex(operatorIndex);
    setTemp(value);
    setValue("0"); // Очистка текущего значения
  }

  // Вычисление результата
  function HandleAns() {
    if (operatorIndex === null) return;

    const operators = ["+", "-", "*", "/"];
    const operator = operators[operatorIndex];

    let result;
    switch (operator) {
      case "+":
        result = parseFloat(temp) + parseFloat(value);
        break;
      case "-":
        result = parseFloat(temp) - parseFloat(value);
        break;
      case "*":
        result = parseFloat(temp) * parseFloat(value);
        break;
      case "/":
        if (value === "0") {
          alert("На ноль делить нельзя!");
          return;
        }
        result = parseFloat(temp) / parseFloat(value);
        break;
      default:
        return;
    }

    setValue(result.toString());
    setTemp(0);
    setOperatorIndex(null);
  }

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="w-1/2 rounded-3xl overflow-hidden">
        <div className="flex-col flex w-full">
          <div
            id="Output"
            className="bg-white flex justify-end items-center w-full"
          >
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e.target.value)}
              className="text-black text-end w-full text-6xl mx-5 my-10"
            />
          </div>
          <main id="main" className="bg-black w-full">
            <div className="grid grid-cols-4 gap-3 m-5">
              <Button
                onClick={HandleClear}
                num={"AC"}
                className="bg-gray-500"
              ></Button>
              <Button
                onClick={() => {
                  alert("Данное действие доступно по подписке");
                }}
                num={"+/-"}
                className="bg-gray-500"
              ></Button>
              <Button
                onClick={() => {
                  alert("Данное действие доступно по подписке");
                }}
                num={"%"}
                className="bg-gray-500"
              ></Button>
              <Button
                onClick={() => HandleOperator(3)}
                num={"/"}
                className="bg-orange-400"
              ></Button>

              <Button onClick={() => HandlePress(7)} num={7}></Button>
              <Button onClick={() => HandlePress(8)} num={8}></Button>
              <Button onClick={() => HandlePress(9)} num={9}></Button>
              <Button
                onClick={() => HandleOperator(2)}
                num={"×"}
                className="bg-orange-400"
              ></Button>

              <Button onClick={() => HandlePress(4)} num={4}></Button>
              <Button onClick={() => HandlePress(5)} num={5}></Button>
              <Button onClick={() => HandlePress(6)} num={6}></Button>
              <Button
                onClick={() => HandleOperator(1)}
                num={"-"}
                className="bg-orange-400"
              ></Button>

              <Button onClick={() => HandlePress(1)} num={1}></Button>
              <Button onClick={() => HandlePress(2)} num={2}></Button>
              <Button onClick={() => HandlePress(3)} num={3}></Button>
              <Button
                onClick={() => HandleOperator(0)}
                num={"+"}
                className="bg-orange-400"
              ></Button>

              <Button
                onClick={() => HandlePress(0)}
                num={0}
                className="col-span-2"
              ></Button>
              <Button onClick={HandleMark} num={"."}></Button>
              <Button
                onClick={HandleAns}
                num={"="}
                className="bg-orange-400"
              ></Button>
            </div>
          </main>
        </div>
      </div>
      <p className="m-3 bg-slate-600 p-3 rounded-full">
        {value}
        {/* Функция для копирования текста в буффет обмена */}
        <button onClick={() => navigator.clipboard.writeText(value)}>📄</button>
      </p>
    </div>
  );
}
