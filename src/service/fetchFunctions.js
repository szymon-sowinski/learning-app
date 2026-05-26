import axios from "axios";

export const fetchCollections = async () => {
    //const res = await axios.get("https://fiszki-api.tenco.waw.pl/collections");
    const res = await axios.get("http://localhost:2137/grupy");
    console.log(res.data)
    return res.data;
};

export const fetchWords = async (groupId, subgroupId) => {
    const res = await axios.get("http://localhost:2137/fiszki", {
        params: {
            groupId,
            subgroupId
        }
    });

    return res.data;
};

export const fetchSubgroups = async () => {
    const res = await axios.get("http://localhost:2137/podgrupy");
    return res.data;
};

export const putChanges = async (groupId, changes) => {
    const res = await axios.put(`https://fiszki-api.tenco.waw.pl/fiszki/${groupId}`, changes);
    // const res = await axios.put(`http://localhost:2137/fiszki/${groupId}`, changes);
    console.log(res.data)
    return res.data;
};