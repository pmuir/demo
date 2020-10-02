import Keycloak from 'keycloak-js';
import {BaseUrl} from "./api/urls";

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: `${BaseUrl("keycloak")}auth`,
    realm: 'basic',
    clientId: 'demo-app-public'

});

export default keycloak;