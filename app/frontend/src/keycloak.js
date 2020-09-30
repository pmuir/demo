import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
    url: 'https://keycloak.g.bleepbleep.org.uk/auth',
    realm: 'basic',
    clientId: 'demo-app-frontend'

});

export default keycloak;