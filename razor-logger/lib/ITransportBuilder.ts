/*
* The ITransportBuilder interface needs to be implemented by classes that create winston's Transport instance
* When creating your own TransportBuilder implement ITransportBuilder and register it using method appendTransportsMap with the name
* Then when initializing the logger via createLogger method - add a property with the map name and an object with it's initializing data.
* This data will be passed to the transport builder for required initializations
* (e.g. for initializing an s3 transport it is required to pass in {bucket: string, folder?: string, access_key_id: string, secret_access_key: string, nameFormat?: string}
* * */
export interface ITransportBuilder{
    buildTransport(options:any);
}