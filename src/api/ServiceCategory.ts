//agregar aca el consumo de la api para las categorias
import api from "@/lib/axios.js";
import { isAxiosError } from "axios";
import type { ServiceCategoryFormData } from "@/schemas/types.js";
import {getCategoriesSchema} from "@/schemas/types.js"

export async function serviceCategoryAPI(formData:ServiceCategoryFormData) {
    try {
        const {data} = await api.post("/categories", formData);
        return data;
    } catch (error) {
            if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}
export async function getCategoriesAPI(page:number = 1 ){
    try {
        const limit = 10;
        const offset = page;
        const {data} = await api.get("/categories",{params:{limit, offset}})
        const response = getCategoriesSchema.safeParse(data);
        // console.log(response)
        if(response.success){
            return response.data;
        }

    } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error);
            }
    }
}

export async function getCategoryProducts(id_category: number) {
  try {
    const { data } = await api.get(`/categories/${id_category}`);
    return data.data.products;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "Error al obtener productos");
    }
    throw error;
  }
}
