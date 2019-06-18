import React from "react";
import { Col } from "react-bootstrap";
import classes from "./ProductList.module.css";

const productList = ({name, brand, type, sid, price, des, add, setRef}) => {
  return (
    
      <div className={classes.ProductList}>
        <figure>

        </figure>
        <div className={classes.Inner}>
            <h4>
              {name}
            </h4>
            <article>
              {des}
            </article>
            <div>
              <span>{price}</span>
              <div className={classes.Buttons}>
                <select ref={setRef(sid)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <button onClick={add}>加入購物車</button>
                <button>查看商品</button>
              </div>
            </div>
        </div>
      </div>
    
  );
}

export default productList