import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'

const BASE = '/milestone'

const Services = {
    getAll(): Promise<AxiosResponse> {
        return requests.get(`/notification`)
    },
    getById(id: string): Promise<AxiosResponse> {
        return requests.get(`${BASE}/${id}`)
    },
    add(body: any): Promise<AxiosResponse> {
        return requests.post(`${BASE}`, body)
    },
}

export default Services
