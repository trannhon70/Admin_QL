import { toast } from "react-toastify";

function EditorInit(uploadFile: any, editorContentRef: any) {
    return {
        height: 700,
        file_picker_callback: function (cb: any, value: any, meta: any) {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.addEventListener("change", (e: any) => {
                const file = e.target.files[0];

                const reader: any = new FileReader();

                reader.addEventListener("load", async () => {
                    const id = "blobid" + new Date().getTime();
                    const blobCache =
                        editorContentRef.current.editorUpload.blobCache;
                    const base64 = reader.result.split(",")[1];
                    const blobInfo = blobCache.create(id, file, base64);
                    blobCache.add(blobInfo);

                    let url = "";
                    try {
                        url = await uploadFile(file);
                    } catch (error) {
                        toast.error("Upload fail");
                        url = "";
                    }
                    cb(url, { title: file.name });
                });
                reader.readAsDataURL(file);
            });
            input.click();
        },
        paste_data_images: true,
        image_title: true,
        image_description: true,
        image_caption: true,
        automatic_uploads: true,
        file_picker_types: "image",
        plugins: [
            "advlist",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "image",
            "codesample",
            "table",
        ],
        menubar: "file edit view insert format tools table help",
        codesample_global_prismjs: true,
        codesample_languages: [
            {
                text: "HTML/XML",
                value: "markup",
            },
            {
                text: "JavaScript",
                value: "javascript",
            },
            { text: "CSS", value: "css" },
            { text: "PHP", value: "php" },
            { text: "Ruby", value: "ruby" },
            { text: "Python", value: "python" },
            { text: "Java", value: "java" },
            { text: "C", value: "c" },
            { text: "C#", value: "csharp" },
            { text: "C++", value: "cpp" },
            { text: "Bash", value: "bash" },
        ],
        toolbar1:
            "undo redo | blocks | " +
            "bold italic foredivor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | link image | code | codesample ",
        toolbar2:
            "table tabledelete | tableprops tabledivprops tablecellprops | tableinsertdivbefore tableinsertdivafter tabledeletediv | tableinsertdivbefore tableinsertdivafter tabledeletediv",
        content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } ",
        link_rel_list: [
            { title: "Nothing", value: "" },
            {
                title: "No Referrer",
                value: "noreferrer",
            },
            {
                title: "No Follow",
                value: "nofollow",
            },
            {
                title: "Sponsored",
                value: "sponsored",
            },
            { title: "UGC", value: "ugc" },
        ],
    };
}
export default EditorInit;
