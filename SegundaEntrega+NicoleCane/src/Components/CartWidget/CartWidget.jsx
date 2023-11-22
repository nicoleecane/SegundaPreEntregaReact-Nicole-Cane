import { AiOutlineShoppingCart } from "react-icons/ai";

export const CartWidget = () => {
  return (
    <div className="h-25">
        <AiOutlineShoppingCart color="red" size={30}/>
        <strong>2</strong>
    </div>
  )
}
