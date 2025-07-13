/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import * as R from "ramda";

const api = new Api();

const validateString = (string) => {
    const predicates = [
        s => s.length < 10,
        s => s.length > 2,
        s => /^\d*\.?\d+$/.test(s),
        s => parseFloat(s) > 0
    ];

    return R.allPass(predicates)(string);
}

const pipeWithLogResult = (writeLog, functions) =>
    R.pipeWith(async (f, res) => {
        const result = await f(await res);
        writeLog(result);
        return result;
    })(functions);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    writeLog(value);

    if (!validateString(value)) return handleError('ValidationError');

    pipeWithLogResult(writeLog, [
        initial => parseFloat(initial),
        value => Math.round(value),
        async (value) => {
            const {result} = await api.get('https://api.tech/numbers/base', {
                from: 10,
                to: 2,
                number: value
            });
            return result;
        },
        binary => binary.length,
        length => length ** 2,
        squared => squared % 3,
    ])(value)
        .then(async (result) => {
            const {result: animal} = await api.get(`https://animals.tech/${result}`, {});
            handleSuccess(animal);
        })
        .catch(error => {
            handleError(error);
        });
};

export default processSequence;
