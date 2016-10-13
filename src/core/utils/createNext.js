import * as _ from 'lodash';

export function constructUrl(types) {
    console.log(types, "Inside constructUrl || ");
    let typesString = "?types=";
    console.log(types);

    let i =0;
    for(var prop in types){
        i++;
        if(types[prop])
            typesString += i+",";
    }   

    return typesString.slice(0, -1);
}


export function removeParam(key, sourceURL) {
    let rtn = sourceURL.split("?")[0],
        param,
        params_arr = [],
        queryString = (sourceURL.indexOf("?") !== -1) ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
        params_arr = queryString.split("&");
        for (let i = params_arr.length - 1; i >= 0; i -= 1) {
            param = params_arr[i].split("=")[0];
            if (param === key) {
                params_arr.splice(i, 1);
            }
        }
        rtn = rtn + "?" + params_arr.join("&");
    }

    return rtn;
}

export function constructLatestUrl(id){

}