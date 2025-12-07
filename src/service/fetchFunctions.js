import axios from "axios";

export const fetchCollections = async () => {
    // const res = await axios.get("https://fiszki-api.tenco.waw.pl/collections");
    const res = await axios.get("http://localhost:2137/collections");
    console.log(res.data)
    return res.data;
};

export const fetchWords = async (groupId) => {
    const res = await axios.get(`https://fiszki-api.tenco.waw.pl/fiszki/${groupId}`);
    console.log(res.data)
    return res.data;
};