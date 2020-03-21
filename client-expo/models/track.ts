class Track {
    id: string
    url: string
    name: string
    logoUrl: string
    constructor(id: string, name: string, url: string, logoUrl: string) {
        this.id = id
        this.name = name
        this.url = url
        this.logoUrl = logoUrl
    }
}

export default Track