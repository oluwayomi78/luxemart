import axios from "axios";

const API_URL = "http://localhost:4300/api/products";


const getAuthConfig = (isFormData = false) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));


    const headers = {
        Authorization: `Bearer ${userInfo?.token}`,
    };

    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }

    return { headers };
};


export const getProducts = async (currentPage = 1) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo?.token) {
        throw new Error("User is not authenticated");
    }

    const config = getAuthConfig();
    const { data } = await axios.get(`${API_URL}?page=${currentPage}`, config);
    return data;
};


export const getProductById = async (id) => {
    const config = getAuthConfig();
    const { data } = await axios.get(`${API_URL}/${id}`, config);
    return data.product; 
};

export const createProduct = async (productData) => {
    
    const config = getAuthConfig(true); 
    const { data } = await axios.post(API_URL, productData, config);
    return data;
};

export const updateProduct = async (id, updatedData) => {
    const config = getAuthConfig(true); 
    const { data } = await axios.put(`${API_URL}/${id}`, updatedData, config);
    return data;
};

export const deleteProduct = async (id) => {
    const config = getAuthConfig();
    const { data } = await axios.delete(`${API_URL}/${id}`, config);
    return data;
};