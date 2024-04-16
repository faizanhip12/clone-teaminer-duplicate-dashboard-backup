import requests from 'src/services/httpService'
import { AxiosResponse } from 'axios'
import { GetParams } from 'src/services/service'

const Services = {
  getAll(id: string): Promise<AxiosResponse> {
    return requests.get(`/playlist/channel/${id}`)
  },
  getAllCatalogueCourses({ query }: GetParams): Promise<AxiosResponse> {
    const urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query as any)) {
      if (value !== undefined && value !== '') {
        urlParams.append(key, value as any);
      }
    }
    const queryString = urlParams.toString()
    const decodedQueryString = decodeURIComponent(queryString);
    return requests.get(decodedQueryString ? `/playlist/get-all-playlist?${decodedQueryString}` : '/playlist/get-all-playlist')
  },
  getAllStudents(id: string): Promise<AxiosResponse> {
    return requests.get(`/playlist/${id}/student`)
  },
  getById(id: string): Promise<AxiosResponse> {
    return requests.get(`/playlist/${id}`)
  },
  enrollInACourse(body: any): Promise<AxiosResponse> {
    return requests.post(`/playlist/enroll`, body)
  },
  add(body: any): Promise<AxiosResponse> {
    return requests.post('/playlist', body)
  },
  update(id: string, body: any): Promise<AxiosResponse> {
    return requests.put(`playlist/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`playlist/${id}`)
  }
}

export default Services
