// let url = `http://192.168.1.3:5050`;  //- dev
// let url = `https://451.jware.cloud:8443`; // -prod
let url = '';
console.log(process.env.NODE_ENV );
if (process.env.NODE_ENV === 'development') {
    url = `http://192.168.1.6:5000`;  //- dev
} else {
    url = `https://451.jware.cloud:8443`; // -prod
}

export const myConfig = {url};