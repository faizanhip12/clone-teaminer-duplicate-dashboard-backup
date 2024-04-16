import { AxiosResponse } from 'axios'

import requests from 'src/services/httpService';
import { GetParams } from 'src/services/service'

const Services = {
  getAll({ query }: GetParams): Promise<AxiosResponse> {
    return requests.get(`/catalog?${query}`);
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/catalog/${id}`);
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/catalog', body);
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`/catalog/${id}`, body);
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/catalog/${id}`);
  },
};

export default Services;
