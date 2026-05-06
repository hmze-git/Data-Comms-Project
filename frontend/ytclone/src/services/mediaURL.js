export  const MEDIA_URL= `${window.location.protocol}//${window.location.hostname}`
//using local host caused issues on the VM this works by taking the protocol be it http or https from the curr page
// then hostname gets  domain/ip without port
// this way it will be picked up by nginx reverse proxy 