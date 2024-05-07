import { heroService } from "../../services/Hero"
import { setAsset, setAssetById, setAssetByUser } from "./assetSlice"
import Swal from "sweetalert2"


export const addAsset = (form) => {
    return async (dispatch) => {
        try {
            const response = await heroService.post("/asset", form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })


            if (response.data !== null) {
                dispatch(setAsset(response.data.access_token))
                dispatch(getAssetByUser())
                dispatch(getAllAsset())
            }
        } catch (error) {
            throw error.response.data.message
        }
    }
}

export const getAllAsset = (params) => {
    return async (dispatch) => {
        try {
            let response; 
            if(!params) {
                response = await heroService.get("/asset", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
            }

            if(params) {
                response = await heroService.get("/asset", {
                    params,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`
                    }
                })
            }

            if (response.data !== null) {
                dispatch(setAsset(response.data))
            }
        } catch (error) {
            throw error.response.data.message
        }
    }
}

export const getAssetByUser = () => {
    return async (dispatch) => {
        try {
            const response = await heroService.get("/asset-by-user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })

            if (response.data !== null) {
                dispatch(setAssetByUser(response.data))
            }
        } catch (error) {
            throw error.response.data.message
        }
    }
}

export const getAssetById = (id) => {
    return async (dispatch) => {
        try {
            const response = await heroService.get(`/asset/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            if (response.data !== null) {
                dispatch(setAssetById(response.data))
            }
        } catch (error) {
            throw error.response.data.message
        }
    }
}

export const updateAsset = (id, form) => {
    return async (dispatch) => {
        try {
            const response = await heroService.put(`/asset/${id}`, form, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            
            if (response.data !== null) {
               
                dispatch(getAssetByUser())
                dispatch(getAllAsset())
            }
        } catch (error) {
            throw error.response.data.message
        }
    }
}

export const removeAsset = (id) => {
    return async (dispatch) => {
        try {
            const response = await heroService.delete(`/asset/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            if (response.data !== null) {
                dispatch(getAssetByUser())
                dispatch(getAllAsset())
            }
        } catch (error) {
            throw error.response.data.message
        }
    }
}

export const approveAsset = (id) => {
    return async (dispatch) => {
        try {
            const response = await heroService.patch(`/asset/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            })
            if (response.data !== null) {
                
                dispatch(getAssetByUser())
                dispatch(getAllAsset())
            }
        } catch (error) {
            throw error.response.data.message
        }
    }
}