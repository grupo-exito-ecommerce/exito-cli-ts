const Configstore = require('configstore');

export default async () => {
    console.log("vtex json")
    new Configstore('vtex', {workspace: 'production'});
}