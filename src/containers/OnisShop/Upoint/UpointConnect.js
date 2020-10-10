import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import TableFok from "../../../components/TableFok";
import { UpointListTableTitle } from "./TableTitle"
import UpointModal from "./UpointModal";
import Moment from "moment";
import {
  GetAllUpointSettings
} from "../../../actions/OnisShop/UpointAction";
import UpointApi from "../../../api/OnisShop/UpointApi";
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
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
      isOpen: false,
      isNew: true,
      selectedRow: null,
    };
  }

  handleReload = () => {
    let tmp = {};
    tmp.contractsymd = this.refs.startCreatedDate.value;
    tmp.contracteymd = this.refs.endCreatedDate.value;
    tmp.startymd = this.refs.startConnectedDate.value;
    tmp.endymd = this.refs.endConnectedDate.value;
    tmp.regno = this.refs.regNum.value == undefined ? "" : this.refs.regNum.value;
    tmp.phoneno = this.refs.phoneNum.value == undefined ? "" : this.refs.phoneNum.value;
    this.props.GetAllUpointSettings(tmp);
  }

  handleNew = () => {
    this.setState({ isNew: true }, () => {
      this.openModal();
    });
    
  }

  handleEdit = () => {
    if(this.state.selectedRow != null)
    {
      this.setState({ isNew: false }, () => {
        this.openModal();
      });
    }
    else
    {
      console.log("Мөр сонго");
    }
  }

  openModal = () => {
    this.setState({ isOpen: true });
  }

  closeModal = () => {
    this.setState({ isOpen: false })
  }

  disableBtn = (cell, row) => {
    UpointApi.DisableUpoint(row.id, row.isenable == 2 ? 1 : 2, localStorage.getItem("id")).then(res => {
      console.log(row.isenable)
      if(res.success)
      {
        if(row.isenable == 1)
        {
          toastr.success("Амжилттай идэвхигүй болголоо.");
        }
        else
        {
          toastr.success("Амжилттай идэвхитэй болголоо.");
        }
        
        this.handleReload();
      }
      else
      {
        toastr.error(res.message);
      }
    });
  }

  rowClick = (row) => {
    const { selectedRow } = this.state;
    if(this.state.selectedRow === null)
    {
      this.setState({ selectedRow: row });
    }
    else
    {
      if(selectedRow.rank !== row.rank)
      {
        this.setState({ selectedRow: row });
      }
      else
      {
        this.setState({ selectedRow: null });
      }
    }
  }

  render() {
    const { isOpen, isNew, selectedRow } = this.state;
    const { data } = this.props;
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="card">
              <div className="card-header">
                <form id="myForm">
                  <div className="row" name="formProps">
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>Бүртгэсэн огноо</label>
                        <div className="display-flex">
                          <Field
                            ref="startCreatedDate"
                            name="startCreatedDate"
                            component="input"
                            type="date"
                            className="form-control dateclss"
                          />
                          <Field
                            ref="endCreatedDate"
                            name="endCreatedDate"
                            component="input"
                            type="date"
                            className="form-control dateclss mr-l-05-rem"
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>Холболт хийсэн огноо</label>
                        <div className="display-flex">
                          <Field
                            ref="startConnectedDate"
                            name="startConnectedDate"
                            component="input"
                            type="date"
                            className="form-control dateclss"
                          />
                          <Field
                            ref="endConnectedDate"
                            name="endConnectedDate"
                            component="input"
                            type="date"
                            className="form-control dateclss mr-l-05-rem"
                          />
                        </div>
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                          Регистрийн дугаар
                        </label>
                        <Field
                          ref="regNum"
                          name="regNum"
                          component="input"
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-sm-1.3 mr-1-rem">
                        <label>
                          Утасны дугаар
                        </label>
                        <Field
                          name="phoneNum"
                          ref="phoneNum"
                          component="input"
                          type="text"
                          className="form-control"
                        />
                      </div>
                    </div>
                </form>
              </div>
              <div className="card-block col-md-12 col-lg-12 col-sm-12 tmpresponsive">
                <TableFok title={UpointListTableTitle} data={data} rowClick={this.rowClick} disableBtn={this.disableBtn}/>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary" onClick={this.handleReload}>
            <i className="fa fa-retweet" />
            Ачаалах
          </button>
          <button type="button" className="btn btn-success mr-1-rem" onClick={this.handleNew}>
            <i className="fa fa-file-text-o" />
            Шинэ
          </button>
          <button type="button" className="btn btn-edit-new mr-1-rem" onClick={this.handleEdit}>
            <i className="fa fa-paper-plane-o" />
            Засах
          </button>
        </div>
        <UpointModal isNew={isNew} isOpen={isOpen} openModal={this.openModal} closeModal={this.closeModal} selectedRow={selectedRow} />
      </div>
    );
  }
}

const form = reduxForm({ form: "upointConnectList" });

function mapStateToProps(state) {
  return {
    data: state.shopUpointReducer.data,
    initialValues: {
      startCreatedDate: new Date().toISOString().slice(0, 10),
      endCreatedDate: new Date().toISOString().slice(0, 10),
      startConnectedDate: new Date().toISOString().slice(0, 10),
      endConnectedDate: new Date().toISOString().slice(0, 10),
    },
  }
}

export default connect(mapStateToProps, {
  GetAllUpointSettings
})(form(Components));