import requests from 'src/services/httpService'
import { Axios, AxiosResponse } from 'axios'
// import { GetParams } from 'src/services/service'

const Services = {
  getAll(id: string): Promise<AxiosResponse> {
    return requests.get(`auth/users/chat?channelId=${id}`)
  },
  updateStatus(id: string, status: string): Promise<AxiosResponse> {
    return requests.put(`/conversation/setting/${id}`, { status })
  },
  startConversation(id: string): Promise<AxiosResponse> {
    return requests.get(`/conversation/message/${id}`)
  },
  getUserActiveStatus(id?: string): Promise<AxiosResponse> {
    return requests.get(`/auth/reciever-status/${id}`)
  },
  conversationStart(body: { participants: string[] }): Promise<AxiosResponse> {
    return requests.post(`/conversation`, body)
  },
  fetchSelectedChannelChat(id: string): Promise<AxiosResponse> {
    return requests.post(`/conversation/channel/${id}`)
  },
  sendMsg(id: string, body: any): Promise<AxiosResponse> {
    return requests.post(`/conversation/message/${id}`, body)
  },
  delete(id: string): Promise<AxiosResponse> {
    return requests.delete(`/conversation/${id}`)
  },
  block(id: string, blockedUser: {}): Promise<AxiosResponse> {
    return requests.put(`/conversation/${id}`, blockedUser)
  },
  connection() {
    const requestsURI = requests.getUri()
    const url = new URL(requestsURI)
    return `${url.origin}`
  }
  // disconnect() {
  //   const requestsURI = requests.getUri()
  //   const url = new URL(requestsURI)
  //   return `${url.origin}`
  // }
}

export default Services
