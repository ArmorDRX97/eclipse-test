export const getValutes = async () => {
    const data = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    return await data.json();
};