// Клонирование объектов
// Первый пример ( метод Object.assign() )

const person = {
    name: "Nikita",
    age: 40,
    color: "black",
};

const militaryman = Object.assign({}, person, {age: 45, rang: "Colonel"});
console.log(person);
console.log(militaryman);

//Второй пример ( оператор spread )

const student = {...person};
console.log(student);

// forEach, map, filter, find
// Пример

const car = [
    { mark: 'Kia', width: 3.4, height: 2 },
    { mark: 'Nissan', width: 4, height: 1.9 },
    { mark: 'Toyota', width: 4.7, height: 2.4 },
    { mark: 'Mersedes', width: 3.1, height: 1.3 },
    { mark: 'Jeep', width: 3.9, height: 1.8 },
]

// forEach

car.forEach(function(sportcar, index, cArr){ // 1 Параметр - элемент; 2 Параметр - индекс; 3 Параметр - массив
    console.log(sportcar);
    // console.log(index);
    // console.log(cArr);

});

// car.forEach(per => console.log(per))  --> Стрелочная функция

// Map

const newCar = car.map(per =>{
    return per.mark
})
console.log(newCar);

// Filter

const w = car.filter(per => {
    if (per.width >= 3.9) {
        return true
    }
});
console.log(w);


// Find

const nissan = car.find(per => per.mark === 'Nissan')
console.log(nissan);


