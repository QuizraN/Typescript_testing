import * as React from "react";
import { Select, Spin } from "antd";
import { Button, Form, Input } from "antd";
import "./AddGroups.css";
import { getAllEmployees } from "../../apis/GroupApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const { Option } = Select;


export const AddGroups:React.FC= () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } :{data:any,isLoading:boolean,isError:boolean}= useQuery(
    ["getAllEmployees"],
    getAllEmployees
  );
  if (isLoading) {
    <Spin />;
  }
  if (isError) {
    <Spin />;
  }
  const mutation = useMutation<any,any,any>((i) => {
    return axios.post(
      `http://localhost:3001/apis/companies/1/users/1/groups/create`,
      i,
      {
        headers: {
          Authorization: localStorage.getItem("google-token-popup-feature")
            ? "Bearer " + localStorage.getItem("google-token-popup-feature")
            : ""
          },
      }
    );
  });
  const onFinish = (values: { groupName: any; EmployeeList: any; }) => {
    mutation.mutate(
      {
        groupName: values.groupName,
        EmployeeList: values.EmployeeList,
      },
      {
        onSuccess: async () => {
          console.log("Successful");
        },
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const selectOptions=(i:{ name: boolean | React.Key | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; })=>{
    return (
      <Option key:Attributes={i.name} values={i.name}>
        {i.name}
      </Option>
    );
  }
  return (
    <>
    <div className="groups">
      <div className="groupname">
        <h1 style={{ width: "75%", margin: "0 auto" }}>Add Group</h1>
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
              label="Group Name"
              name="groupName"
              rules={[
                { required: true, message: "Please enter your Group Name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Employees List"
              name="EmployeeList"
              rules={[
                { required: true, message: "Please enter Group members!" },
              ]}
            >
              <Select
                mode="multiple"
                //name="EmployeeList"
                style={{
                  width: "100%",
                }}
                allowClear
                // onChange={handleChange}
                maxTagCount={2}
                placeholder="Please select"
              >
                {data?.map((i: { name: boolean | React.Key | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; }) => {
                  return (
                    <Option values={i.name}>
                      {i.name}
                    </Option>
                  );
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
    </>
  );
}



// import * as React from 'react'

// export function AddGroups(): JSX.Element;

// export function AddGroups() {
//   return (
//     <div>AddGroups</div>
//   )
// }

