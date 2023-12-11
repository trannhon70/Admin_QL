import { Card, Row } from "antd";
import { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

const MySunEditor = (props : any) => {
const {setContent, content} = props
  const editor : any = useRef();
  const [key, setKey] = useState(Date.now());

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
          name="my-editor"
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
          key={key}
          setContents={content}
        />
      </Row>
      
    </Card>
  );
};
export default MySunEditor;
