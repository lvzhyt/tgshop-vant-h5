import {chooseSkuSpecData} from "../data/chooseSkuSpecData";

/* eslint-disable */
export const getChooseSku = req => {
    console.log('mock '+req.url)
    return chooseSkuSpecData
}
