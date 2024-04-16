export interface CertificateApi {
    [key: string]: any
    playList?: {
        id: string
        name: string
    }
}

export interface ICertificate extends CertificateApi {
    [key: string]: any
}
