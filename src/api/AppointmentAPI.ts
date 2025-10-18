import type { Appointment, AppointmentFormData, servicesFormData } from "@/schemas/types.js";
import api from "@/lib/axios.js";
import { isAxiosError } from "axios";
import type {Service } from "@/schemas/types.js";
import {dashboardAppointmentSchema,tableServicesSchema} from "@/schemas/types.js";

export async function createAppointment(formData: AppointmentFormData) {
    try {
        const {data} = await api.post('/appointment', formData)
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAppointment() {
    try {
        const {data} = await api('/appointment')
        const response = dashboardAppointmentSchema.safeParse(data.data)
        console.log(response);
        if(response.success){
            return response.data
        }
        // return data.data ?? []
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getAppointmentById(id: Appointment['id']) {
    try {
        const {data} = await api(`/appointment/${id}`)
          return data; 

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type AppointmentAPIType = {
    formData: AppointmentFormData,
    appointmentId: Appointment ['id']
}

export async function updateAppointment({formData, appointmentId}: AppointmentAPIType) {
    try {
        const {data} = await api.put(`/appointment/${appointmentId}`,formData)
          return data; 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteAppointment(id: Appointment['id']) {
    try {
        const url = `/appointment/${id}`
        const {data} = await api.delete<string>(url)
          return data; 

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

// Apis for services 
export async function createServices(formData: servicesFormData) {
    try {
        const {data} = await api.post('/services', formData)
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getServices() {
    try {
        const {data} = await api('/services')
        const response = tableServicesSchema.safeParse(data.data)
        console.log(response);
        if(response.success){
            return response.data
        }
        // return data.data ?? []
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getServicesById(id: Service['id']) {
    try {
        const {data} = await api(`/services/${id}`)
          return data; 

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

type ServicesAPIType = {
    formData: servicesFormData,
    appointmentId: Service ['id']
}

export async function updateServices({formData, appointmentId}: ServicesAPIType) {
    try {
        const {data} = await api.put(`/services/${appointmentId}`,formData)
          return data; 
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function deleteServices(id: Service['id']) {
    try {
        const url = `/services/${id}`
        const {data} = await api.delete<string>(url)
          return data; 

    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}