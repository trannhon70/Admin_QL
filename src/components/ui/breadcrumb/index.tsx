import React from 'react';
import { Breadcrumb } from 'antd';
const BreadCrumb = (props: any) => {
    return <Breadcrumb
    style={{marginBottom:'20px'}}
    items={props.data}
  />
}

export default BreadCrumb