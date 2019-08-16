import {chooseSkuSpecData} from "../data/chooseSkuSpecData";


export const getChooseSku = req => {
    console.log('mock '+req.url)
    return chooseSkuSpecData
}
