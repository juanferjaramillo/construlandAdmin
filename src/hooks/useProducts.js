import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../redux/actions";
import { useEffect } from "react";

export default function useProducts() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authUser)
    const products = useSelector(state => state.filteredProducts)
    useEffect(() => {
        Object.values(user).length > 0 ? dispatch(getAllProducts(user.id)) : null
    }, [user])
    return products
}
