"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AddGroups = void 0;
var React = require("react");
var antd_1 = require("antd");
var antd_2 = require("antd");
require("./AddGroups.css");
var GroupApi_1 = require("../../apis/GroupApi");
var react_query_1 = require("react-query");
var axios_1 = require("axios");
var Option = antd_1.Select.Option;
var AddGroups = function () {
    var queryClient = (0, react_query_1.useQueryClient)();
    var _a = (0, react_query_1.useQuery)(["getAllEmployees"], GroupApi_1.getAllEmployees), data = _a.data, isLoading = _a.isLoading, isError = _a.isError;
    if (isLoading) {
        <antd_1.Spin />;
    }
    if (isError) {
        <antd_1.Spin />;
    }
    var mutation = (0, react_query_1.useMutation)(function (i) {
        return axios_1["default"].post("http://localhost:3001/apis/companies/1/users/1/groups/create", i, {
            headers: {
                Authorization: localStorage.getItem("google-token-popup-feature")
                    ? "Bearer " + localStorage.getItem("google-token-popup-feature")
                    : ""
            }
        });
    });
    var onFinish = function (values) {
        mutation.mutate({
            groupName: values.groupName,
            EmployeeList: values.EmployeeList
        }, {
            onSuccess: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    console.log("Successful");
                    return [2 /*return*/];
                });
            }); }
        });
    };
    var onFinishFailed = function (errorInfo) {
        console.log("Failed:", errorInfo);
    };
    var selectOptions = function (i) {
        return (<Option key:Attributes={i.name} values={i.name}>
        {i.name}
      </Option>);
    };
    return (<>
    <div className="groups">
      <div className="groupname">
        <h1 style={{ width: "75%", margin: "0 auto" }}>Add Group</h1>
        <div className="groupInfo">
          <antd_2.Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
            <antd_2.Form.Item label="Group Name" name="groupName" rules={[
            { required: true, message: "Please enter your Group Name!" },
        ]}>
              <antd_2.Input />
            </antd_2.Form.Item>

            <antd_2.Form.Item label="Employees List" name="EmployeeList" rules={[
            { required: true, message: "Please enter Group members!" },
        ]}>
              <antd_1.Select mode="multiple" 
    //name="EmployeeList"
    style={{
            width: "100%"
        }} allowClear 
    // onChange={handleChange}
    maxTagCount={2} placeholder="Please select">
                {data === null || data === void 0 ? void 0 : data.map(function (i) {
            return (<Option values={i.name}>
                      {i.name}
                    </Option>);
        })}
              </antd_1.Select>
            </antd_2.Form.Item>

            <antd_2.Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <antd_2.Button type="primary" htmlType="submit">
                Submit
              </antd_2.Button>
            </antd_2.Form.Item>
          </antd_2.Form>
        </div>
      </div>
    </div>
    </>);
};
exports.AddGroups = AddGroups;
// import * as React from 'react'
// export function AddGroups(): JSX.Element;
// export function AddGroups() {
//   return (
//     <div>AddGroups</div>
//   )
// }
