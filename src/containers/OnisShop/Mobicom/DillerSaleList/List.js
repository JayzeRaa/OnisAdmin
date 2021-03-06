import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../../components/TableFok";
import { DillerListTableTitle } from "./TableTitle"
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { GetAllDillerSaleList } from "../../../../actions/OnisShop/MobicomAction";
toastr.options = {
    positionClass : 'toast-top-center',
    hideDuration: 1000,
    timeOut: 4000,
    closeButton: true
  }

class Components extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleReload = () => {
    let tmp = {
      startymd: this.refs.startDate.value,
      endymd: this.refs.endDate.value,
      dealerregno: this.refs.dillerRegno.value == undefined ? "" : this.refs.dillerRegno.value,
      regno: this.refs.storeRegno.value == undefined ? "" : this.refs.storeRegno.value,
    }

    this.props.GetAllDillerSaleList(tmp);
  }

  generateFooterItems = (index, label) => {
    let tmp = {
      label: "0",
      columnIndex: index,
      align: "center",
      formatter: data => {
        let sum = 0;
        data.map((item, i) => {
          if (item[label] !== undefined && item[label] !== NaN) {
            sum += item[label];
          }
        });
        return (
          <strong>
            {sum === 0 ? "-" : sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </strong>
        );
      }
    }
    return tmp;
  }

  render() {
    const { data, isLoading } = this.props;
    const footerData = [
      [
        {
          label: "Нийт",
          columnIndex: 1
        },
        this.generateFooterItems(8, "payamount"),
      ]
    ];
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm">
                  <div className="row" name="formProps">
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>Борлуулалт хийгдсэн огноо</label>
                        <div className="display-flex">
                          <Field
                            ref="startDate"
                            name="startDate"
                            component="input"
                            type="date"
                            className="form-control dateclss"
                          />
                          <Field
                            ref="endDate"
                            name="endDate"
                            component="input"
                            type="date"
                            className="form-control dateclss mr-l-05-rem"
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                        Диллерийн РД
                        </label>
                        <Field
                          ref="dillerRegno"
                          name="dillerRegno"
                          component="input"
                          type="text"
                          className="form-control"
                        />
                      </div>
											<div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                        Дэлгүүрийн РД
                        </label>
                        <Field
                          ref="storeRegno"
                          name="storeRegno"
                          component="input"
                          type="text"
                          className="form-control"
                        />
                      </div>				
                    </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={DillerListTableTitle} data={data}  footerData={footerData}/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className={`fa fa-cog ${isLoading ? 'fa-spin' : ''}`} />
            Ачаалах
          </button>
        </div>
      </div>
    );
  }
}

const form = reduxForm({ form: "mobiDillerList" });

function mapStateToProps(state) {
  return {
    data: state.shopMobicom.saleList,
    isLoading: state.shopMobicom.isLoading,
    initialValues: {
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
    },
  }
}

export default connect(mapStateToProps, { GetAllDillerSaleList })(form(Components));
