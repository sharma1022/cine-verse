import axios from "axios"

const get = async () => {
    const res = await axios.get(url);
    return res.data;
}

export default { get };