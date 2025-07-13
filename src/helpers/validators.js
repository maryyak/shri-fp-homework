/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import * as R from "ramda";

const COLORS = ['blue', 'orange', 'green', 'red']

const countByColor = (shapes, color) => {
    return Object.values(shapes).filter(shape => shape === color).length
}

const areAllSameColor = R.curry((color, shapes) =>
    R.all(R.equals(color))(Object.values(shapes))
);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }

    return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => {
    return countByColor(shapes, 'green') >= 2;
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => {
    return countByColor(shapes, 'red') === countByColor(shapes, 'blue');
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (shapes) => {
    const predicates = [
        s => s.circle === 'blue',
        s => s.star === 'red',
        s => s.square === 'orange'
    ];

    return R.allPass(predicates)(shapes);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (shapes) => {
    const predicates = COLORS.map(color => s => countByColor(s, color) >= 3);

    return R.anyPass(predicates)(shapes);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (shapes) => {
    const predicates = [
        s => countByColor(s, 'green') === 2,
        s => s.triangle === 'green',
        s => countByColor(s, 'red') === 1,
    ];

    return R.allPass(predicates)(shapes);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
    return areAllSameColor('orange')(shapes)
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star}) => {
    const predicates = [
        star => star !== 'white',
        star => star !== 'red',
    ];

    return R.allPass(predicates)(star);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
    return areAllSameColor('green')(shapes)
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({triangle, square}) => {
    const predicates = [
        (triangle, square) => triangle === square,
        triangle => triangle !== 'white',
    ];

    return R.allPass(predicates)(triangle, square);
};
