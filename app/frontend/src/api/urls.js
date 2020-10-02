export const BaseUrl = (service) => {
    const host = window.location.host;
    return `https://${host.replace("app", service)}/`;
};