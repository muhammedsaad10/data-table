import * as React from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./form.css";
import axios from "axios";

import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import business from "../../images/business.png";
import { useForm } from "react-hook-form";

const initialsState = {
  item: "",
  kilogram: "",
  mrp: "",
  distributerPrice: "",
  dp: "",
  costOfProduct: "",
  packingCost: "",
  percentage: "",
  packingGst: "",
  tax: "",
  incTaxCost: "",
  grossProfit: "",
};

export default function TextFieldSizes() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("errrrrorr---", errors);
  const [data, setdata] = useState(initialsState);

  var [response, setResponse] = useState(null);
  const [searchParams] = useSearchParams();
  const updateItemId = searchParams.get("itemId");
  const [incTax, setIncTax] = useState();

  const [gross, setGross] = useState();

  const [newTax, setNewTax] = useState();

  const [select, setSelect] = useState("");
  const onSubmit = (data) => console.log(data);

  const update = async () => {
    const kilogram = data?.kilogram.split(" ");
    data.kilogram = `${kilogram[0]} ${select}`;
    const ax = await axios
      .patch(`http://localhost:8800/item/${updateItemId}`, data)
      .then((response) => {
        console.log("response is ", response);
        // alert("item updated succesfully");
        Swal.fire({
          title: "Success",
          text: "updated successful",
          icon: "success",
          confirmButtonText: "OK",
        });
        setdata(initialsState);
        setNewTax("");
        setIncTax("");
        setGross("");

        // window.location.replace("/table");
      })
      .catch((err) => {
        const errmsg = err.toString();
        console.log("error is ", errmsg);
        alert(errmsg);
      });
    console.log("axxxxxxx", ax);
  };

  useEffect(() => {
    let tmpTax = (data?.distributerPrice * (data?.percentage / 100)).toFixed(2);
    setNewTax(tmpTax);
    setdata({ ...data, tax: tmpTax });
  }, [data?.distributerPrice, data?.percentage]);

  useEffect(() => {
    if (data?.distributerPrice && data?.percentage) {
      let tmpInc = (
        parseFloat(data?.costOfProduct) +
        parseFloat(data?.packingCost) +
        parseFloat(newTax)
      ).toFixed(2);
      setIncTax(tmpInc);
      setdata({ ...data, incTaxCost: tmpInc });
    }
  }, [data?.costOfProduct, data?.packingCost, newTax]);

  useEffect(() => {
    if (incTax) {
      let tmpGross = (parseFloat(data?.dp) - parseFloat(incTax)).toFixed(2);
      setGross(tmpGross);
      setdata({ ...data, grossProfit: tmpGross });
    }
  }, [data?.dp, incTax]);

  const add = async () => {
    let flag = 0;
    console.log("selectttt----", select);

    // if (select == "") {
    //   flag = 1;
    // }
    // for (const prop in data) {
    //   console.log("jjjjjjjjjjjjj", data[prop], "prop--", prop);
    //   if (data[prop] == "") {
    //     flag = 1;
    //   }
    // }
    console.log(flag, data.kilogram, select, "weight");
    if (flag == 0) {
      let tempselect = data?.kilogram + " " + select;
      console.log("ssssssssssss", tempselect);
      console.log("hhhhhhhhhhhh", data?.kilogram);
      let newData = {
        item: data?.item,
        kilogram: tempselect,
        mrp: data?.mrp,
        distributerPrice: data?.distributerPrice,
        dp: data?.dp,
        costOfProduct: data?.costOfProduct,
        packingCost: data?.packingCost,
        percentage: data?.percentage,
        packingGst: data?.packingGst,
        tax: data?.tax,
        incTaxCost: data?.incTaxCost,
        grossProfit: data?.grossProfit,
      };

      axios.post("http://localhost:8800/item", newData);
      console.log("eeeeee=", newData.kilogram);
      setdata({
        item: "",
        kilogram: "",
        mrp: "",
        distributerPrice: "",
        dp: "",
        costOfProduct: "",
        packingCost: "",
        percentage: "",
        packingGst: "",
        tax: "",
        incTaxCost: "",
        grossProfit: "",
      });
      setNewTax("");
      setIncTax("");
      setGross("");
      setSelect("");

      //window.location.reload(false);

      Swal.fire({
        title: "Success",
        text: "added successful",
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log("sending data: ", data);
    } else {
      // alert("please fill out all field");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the field",
      });
    }
  };
  // const isEmpty = () => {
  //   console.log("the final data is ", data);

  //   console.log("ssssssssssss", select);
  //   console.log("hhhhhhhhhhhh", data?.kilogram);
  // };

  const getDetails = async () => {
    const res = await axios.get(
      `http://localhost:8800/item/find/${updateItemId}`
    );

    console.log(res.data, "res.data");
    if (res?.data) {
      setdata({
        item: res?.data?.item,
        kilogram: res?.data?.kilogram,
        mrp: res?.data?.mrp,
        distributerPrice: res?.data?.distributerPrice,
        dp: res?.data?.dp,
        costOfProduct: res?.data?.costOfProduct,
        packingCost: res?.data?.packingCost,
        percentage: res?.data?.percentage,
        packingGst: res?.data?.packingGst,

        tax: res?.data?.tax,
        incTaxCost: res?.data?.incTaxCost,
        grossProfit: res?.data?.grossProfit,
      });
      console.log("daaa====", setdata.kilogram);
      setNewTax(res?.data?.tax);
      setIncTax(res?.data?.incTaxCost);
      setGross(res?.data?.grossProfit);
    }
    setResponse(res);
  };

  useEffect(() => {
    console.log("sdfghjk");
    getDetails();
  }, [updateItemId]);

  return (
    <div className="mainDiv">
      <div className="titleContainer">
        <Link to="/table" style={{ color: "inherit", textDecoration: "none" }}>
          <button className="btnOverView">overview</button>
        </Link>
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <button className="btnAddItem">+Add Items</button>
        </Link>
      </div>
      <hr />

      <div className="formMainDiv">
        <form
          className="form"
          onSubmit={handleSubmit(add)}

          // onClick={(e) => {
          //   e.preventDefault();
          //   add();
          // }}
        >
          <div className="inputContainer">
            <div className="formContainer container">
              <div className="row">
                <div className="col-lg-6 col-md-12">
                  <label className="label">Items</label>
                  <input
                    {...register("item", { required: "this is required" })}
                    type="text"
                    className="input"
                    placeholder="Enter here"
                    value={data?.item}
                    onChange={(event) => {
                      setdata({ ...data, item: event.target.value });
                      console.log("event:", event.target.value);
                      console.log("data", data);
                    }}
                  />
                  <p className="errMsg">{errors.item?.message}</p>
                </div>

                <div className="col-lg-6 col-md-12">
                  <label className="label">Image</label>
                  <div className="image">
                    <FontAwesomeIcon
                      icon={faImage}
                      color={"gray"}
                      size={"lg"}
                    />
                    <div>
                      <p className="fontPara">upload image here</p>
                      <p className="fontPara">png or jpg</p>
                    </div>

                    <label className="filelabel" for="file">
                      Upload
                    </label>
                    <input type="file" className="fileinput" id="file" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12">
                  <label className="label">Weight</label>
                  <div className="parentweight input">
                    <div className="weightDiv">
                      <input
                        {...register("weight", {
                          required: "this is required",
                        })}
                        type="text"
                        className="inputStyle"
                        placeholder="Enter here"
                        value={data?.kilogram.split(" ")[0]}
                        onChange={(event) => {
                          setdata({ ...data, kilogram: event.target.value });
                        }}
                      />
                    </div>

                    {/* <p className="errMsg">{errors.weight?.message}</p> */}

                    <div className="weightSelect">
                      <select
                        {...register("weightage", {
                          required: false,
                        })}
                        name="kg"
                        id="selectweight"
                        onChange={(event) => {
                          console.log("kkkkkkkkkkkkk", event.target.value);
                          console.log("kkttttttttttttt", select);
                          setSelect(" ");
                          setSelect(event.target.value);
                        }}
                      >
                        <option value={data?.kilogram.split(" ")[1]}>
                          {data?.kilogram.split(" ")[1]}
                        </option>

                        {/* <option value="">select</option> */}
                        <option value="kg">kg</option>
                        <option value="gm">gm</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                      </select>
                    </div>

                    {/* <p className="errMsg">{errors.weightage?.message}</p> */}
                  </div>
                  <p className="errMsg">
                    {errors.weight?.message}.
                    <span className="errMsg"> {errors.weightage?.message}</span>
                  </p>
                </div>
                <div className="col-lg-6 col-md-12">
                  <label className="label">MRP</label>
                  <input
                    {...register("mrp", { required: "this is required" })}
                    type="number"
                    placeholder="Enter here"
                    className="input"
                    value={data?.mrp}
                    onChange={(event) => {
                      setdata({ ...data, mrp: event.target.value });
                    }}
                  ></input>
                  <p className="errMsg">{errors.mrp?.message}</p>
                </div>
                <div className="col-lg-6 col-md-12">
                  <label className="label">Distributer price</label>
                  <input
                    {...register("distributerPrice", {
                      required: "this is required",
                    })}
                    type="number"
                    className="input"
                    placeholder="Enter here"
                    value={data?.distributerPrice}
                    onChange={(event) => {
                      setdata({
                        ...data,
                        distributerPrice: event.target.value,
                      });
                    }}
                  ></input>
                  <p className="errMsg">{errors.distributerPrice?.message}</p>
                </div>
                <div className=" col-lg-6 col-md-12">
                  <label className="label">Dealer price</label>
                  <input
                    {...register("dp", { required: "this is required" })}
                    type="number"
                    placeholder="Enter here"
                    className="input"
                    value={data?.dp}
                    onChange={(event) => {
                      setdata({ ...data, dp: event.target.value });
                    }}
                  ></input>
                  <p className="errMsg">{errors.dp?.message}</p>
                </div>

                <div className="col-lg-6 col-md-12">
                  <label className="label">Cost of Product</label>
                  <input
                    {...register("costOfProduct", {
                      required: "this is required",
                    })}
                    type="number"
                    className="input"
                    placeholder="Enter here"
                    value={data?.costOfProduct}
                    onChange={(event) => {
                      setdata({ ...data, costOfProduct: event.target.value });
                    }}
                  ></input>
                  <p className="errMsg">{errors.costOfProduct?.message}</p>
                </div>

                <div className="col-lg-6 col-md-12">
                  <label className="label">Tax Percentage</label>

                  <select
                    {...register("taxPercentage", {
                      required: "this is required",
                    })}
                    className="input"
                    value={data?.percentage}
                    onChange={(event) => {
                      setdata({
                        ...data,
                        percentage: event.target.value,
                      });
                    }}
                  >
                    <option value={""}>select</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                  </select>
                  <p className="errMsg">{errors.taxPercentage?.message}</p>
                </div>

                <div className="col-lg-6 col-md-12">
                  <label className="label">Package Cost</label>
                  <input
                    {...register("packingCost", {
                      required: "this is required",
                    })}
                    type="number"
                    className="input"
                    placeholder="Enter here"
                    value={data?.packingCost}
                    onChange={(event) => {
                      setdata({ ...data, packingCost: event.target.value });
                    }}
                  ></input>
                  <p className="errMsg">{errors.costOfProduct?.message}</p>
                </div>
                <div className="col-lg-6 col-md-12">
                  <label className="label">Packing Tax</label>

                  <select
                    {...register("packinggst", {
                      required: "this is required",
                    })}
                    className="input"
                    value={data.packingGst}
                    onChange={(event) => {
                      setdata({ ...data, packingGst: event.target.value });
                    }}
                  >
                    <option value={""}>select</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                  </select>
                  <p className="errMsg">{errors.packinggst?.message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="taxInfo">
            <div className="labels">
              <label className="taxLabel">Tax</label>
              <label className="taxLabel">-</label>

              <input
                className="TaxInput"
                type="number"
                value={newTax}
                onChange={(event) => {
                  setdata({ ...data, tax: event.target.value });
                }}
              />
            </div>
            <div className="labels">
              <label className="taxLabel">Including Tax Cost</label>
              <label className="taxLabel">-</label>
              <input className="TaxInput" type="number" value={incTax} />
            </div>
            <div className="labels">
              <label className="taxLabel">Gross Profit</label>
              <label className="taxLabel">-</label>
              <input className="TaxInput" type="number" value={gross} />
            </div>
          </div>
          <div className="FormButton">
            <button
              className="btnCancel"
              onClick={() => {
                setdata(initialsState);
              }}
            >
              Cancel
            </button>
            {response != null ? (
              <button onClick={update} className="btnAdd">
                Update
              </button>
            ) : (
              <input type="submit" className="btnAdd" />
              // <button
              //   onClick={(e) => {
              //     e.preventDefault();
              //     add();
              //   }}
              //   className="btnAdd"
              // >
              //   Add
              // </button>
            )}
          </div>
        </form>
        <img src={business} alt="Italian Trulli" className="imgIcon"></img>
      </div>
    </div>
  );
}
