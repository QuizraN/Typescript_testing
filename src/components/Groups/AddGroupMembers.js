import React, { useEffect } from "react";
import { Select, Spin } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import "./AddGroups.css";
import {  getnonGroupEmployees } from "../../apis/GroupApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useParams } from "react-router";

const { Option } = Select;

const children = [];

//const handleChange = (props, value) => {
//  console.log(`selected ${value}`);
//  //return value
//  //
//};

function AddGroupMembers() {
    const group=useParams()
    //console.log("group name check in: AddGroupMembers",groupName)
    const queryClient = useQueryClient();
  const { data, isLoading, isError,isFetched, refetch } = useQuery(
    ["getnonGroupEmployees1",group.groupName],
    getnonGroupEmployees
  );
  
  if (isLoading) {
    <Spin />;
  }
  if (isError) {
    <Spin danger="true" />;
  }
  if(isFetched && data )
  {
    console.log("hello data,",data)
  }
  const mutation = useMutation((i) => {
    return axios.put(
      `http://localhost:3001/apis/companies/1/groups/members/create`,
      i,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : "", //(bearer + token) sending to backend
          //Authorization:localStorage.getItem("google-token-popup-feature")?("Bearer " + localStorage.getItem("google-token-popup-feature")):"",
        },
      }
    );
  });
  const onFinish = (values) => {
    //values.EmployeesList={}
    console.log("Checking EmployeeList",values)
    mutation.mutate(
        {
            groupName:group.groupName,
            EmployeeList:values.Employees,
        }
        ,
      {
        onSuccess: async () => {
          console.log("Successful");
          alert("Group Members added!")
          await queryClient.refetchQueries();
        },
      }
      );
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  return (
    <div className="groups">
      <div className="groupname">
        <h1 style={{ width: "50%", margin: "20px auto" }}>Add Group Members</h1>
        <div className="groupInfo">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            

            <Form.Item
              label="Employees"
              name="Employees"
              rules={[
                { required: true, message: "Please add group members!" },
              ]}
            >
              <Select
                mode="multiple"
                name="Employees"
                style={{
                  width: "100%",
                }}
                allowClear
                // onChange={handleChange}
                maxTagCount={2}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
              >
                {data?.map((i) => {
                  return (
                    <Option key={i} values={i}>
                      {i.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default AddGroupMembers
