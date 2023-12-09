import { Button, Card, Input, Row } from "antd";
import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const MySunEditor = (props : any) => {
const {setContent} = props

  const editor : any = useRef();
  
  const getSunEditorInstance = (sunEditor : any) => {

    editor.current = sunEditor;
  };

  const handleChangeEditor = (e : any) => {
    setContent(e)
  }

  return (
    <Card className="">
      <Row>
        <SunEditor
          setOptions={{
            buttonList: [
              ["font", "fontSize", "formatBlock"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["align", "horizontalRule", "list", "table"],
              ["fontColor", "hiliteColor"],
              ["outdent", "indent"],
              ["undo", "redo"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["link", "image"],
              ["preview", "print"],
              ["fullScreen", "showBlocks", "codeView"],
            ],
          }}
          getSunEditorInstance={getSunEditorInstance}
          height="35vh"
          onChange={handleChangeEditor}
        />
      </Row>
      
    </Card>
  );
};
export default MySunEditor;
