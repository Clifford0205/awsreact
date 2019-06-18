import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import classes from "./Control.module.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

const control = ({
  filterHandler,
  toggle,
  setRef,
  searchHandler,
  filter,
  search,
  clearAllHandler,
  showPopular
}) => {
  let style = { background: "rgb(207, 204, 204)" };
  return (
    <div className={classes.Control}>
      <Container fluid className="d-flex justify-content-center p-0">
        <Col lg={10} className="p-0 m-0">
          <p className="r_fs_20 m-0 r_color_red r_fw_extra_bold">文章專區</p>
          <p className="m-0 r_fw_medium mt-1">各種單車相關新聞以及教學</p>
        </Col>
        <div style={{ height: "88px" }} />
      </Container>
      <Row>
        {showPopular ? null : (
          <>
            <Col lg={6} className="text-nowrap">
              <div className={classes.Filter}>
                <ul>
                  <li
                    data-value="國際賽事"
                    onClick={filterHandler}
                    style={filter === "國際賽事" ? style : null}
                  >
                    國際賽事
                  </li>
                  <li
                    data-value="相關裝備"
                    onClick={filterHandler}
                    style={filter === "相關裝備" ? style : null}
                  >
                    相關裝備
                  </li>
                  <li
                    data-value="車友新聞"
                    onClick={filterHandler}
                    style={filter === "車友新聞" ? style : null}
                  >
                    車友新聞
                  </li>
                  <li
                    data-value="新車上市"
                    onClick={filterHandler}
                    style={filter === "新車上市" ? style : null}
                  >
                    新車上市
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={12} className="text-nowrap">
              <div className={classes.Search}>
                <div className={classes.SearchInner}>
                  {search ? (
                    <div
                      className={classes.SearchFilter}
                      onClick={searchHandler}
                    >
                      目前搜尋條件： {search} <span>X</span>
                    </div>
                  ) : (
                    <div
                      style={{ border: "none" }}
                      className={classes.SearchFilter}
                    />
                  )}
                  <div className={classes.SearchBar}>
                    <input type="text" ref={setRef} />
                    <span className={classes.Icon}>
                      <FontAwesomeIcon icon={faSearch} />
                    </span>
                    <button onClick={searchHandler}>搜尋</button>
                  </div>
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default control;
