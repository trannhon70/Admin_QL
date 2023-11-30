import { useEffect, useState } from "react";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { IoAddCircleOutline } from "react-icons/io5";
import { BiImageAdd } from "react-icons/bi";

import PrimaryButton from "components/ui/button/PrimaryButtton";
import PrimaryInput from "components/ui/input/PrimaryInput";
import { appAction } from "redux/app/app.slice";
import { sectorAction } from "redux/sector/sector.slice";
import { LuEdit2 } from "react-icons/lu";

type PropsType = {
    title: string;
    description?: string;
    refreshData: Function;
    sector?: any;
};

const SectorModal = (props: PropsType) => {
    const dispatch = useDispatch<any>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [sectorName, setSectorName] = useState(
        props?.sector?.sectorName || ""
    );
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [iconlUrl, setIconUrl] = useState<any>(props?.sector?.icon || "");

    const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileSelected = e.currentTarget.files?.[0];
        if (typeof fileSelected === "undefined") return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setIconUrl(reader.result);
        };
        if (fileSelected.type.match(/image.*/)) {
            setIconFile(fileSelected);
            reader.readAsDataURL(fileSelected);
        }
    };

    const handleUploadImg = async (file: File | null) => {
        //
        try {
            const formData = new FormData();
            if (file) formData.append("file", file);

            // call api upload
            const uploadResult = await dispatch(appAction.uploadFile(formData));
            return uploadResult.payload.data.url;
        } catch (err) {
            throw new Error("Upload fail");
        }
    };

    const handleShow = () => {
        setIsModalOpen(true);
    };

    const createSector = async () => {
        try {
            const uploadResult = await handleUploadImg(iconFile);

            const result = dispatch(
                sectorAction.create({
                    sectorName,
                    icon: uploadResult,
                })
            );
            ///
            result.then((data: any) => {
                if (data.error) {
                    toast.error("Create Fail");
                    return;
                }

                toast.success("create successfully!");
                props.refreshData();
                setIsModalOpen(false);
            });
        } catch (err: any) {
            toast.error(err.message || "create fail");
        }
    };

    const updateSector = async () => {
        //

        try {
            let uploadResult = props?.sector?.icon;
            if (iconlUrl !== props?.sector?.icon) {
                uploadResult = await handleUploadImg(iconFile);
            }

            const result = dispatch(
                sectorAction.update({
                    id: props?.sector?._id,
                    sectorName,
                    icon: uploadResult,
                })
            );
            ///
            result.then((data: any) => {
                if (data?.error) {
                    toast.error("Create Fail");
                    return;
                }
                toast.success("Update successfully!");
                props.refreshData();
                setIsModalOpen(false);
            });
        } catch (err: any) {
            toast.error(err.message || "Update fail");
        }
    };

    const handleOk = async () => {
        if (props?.sector) {
            updateSector();
        } else {
            createSector();
        }
    };
    const handleCancel = () => {
        if (!props?.sector) {
            setIconUrl("");
            setIconFile(null);
            setSectorName("");
        }

        setIsModalOpen(false);
    };

    useEffect(() => {
        if (props?.sector) {
            setSectorName(props?.sector?.sectorName);
            setIconUrl(props?.sector?.icon);
        }
    }, [props?.sector]);

    return (
       <>
          {props?.sector ? (
             <button onClick={handleShow}>
                <LuEdit2 size={24} className="mr-2 text-sky-500" />
             </button>
          ) : (
             <PrimaryButton
                className="w-full !py-1.5 px-5"
                content="Thêm mới"
                onClick={handleShow}
                icon={<IoAddCircleOutline size={24} className="mr-1" />}
             ></PrimaryButton>
          )}

          <Modal title={props.title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
             <div className="py-3">
                <PrimaryInput
                   label="Tên danh mục"
                   className="mb-4"
                   value={sectorName}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSectorName(e.target.value);
                   }}
                />

                <label htmlFor="sector-img">Hình ảnh</label>
                <div
                   className="relative border border-dashed border-gray-300 rounded-md aspect-video w-full h-36 me-4"
                   id="sector-img"
                >
                   {iconlUrl && (
                      <img className="h-full w-full absolute object-contain" src={iconlUrl} alt="thumbnail"></img>
                   )}

                   <div className="absolute flex items-center justify-center rounded-md opacity-0 hover:opacity-50 bg-gray-300 h-full w-full p-2">
                      <label htmlFor="input-thumbnail" className="flex items-center justify-center h-full w-full">
                         <BiImageAdd size={50} className="text-gray-400" />
                      </label>
                      <input
                         id="input-thumbnail"
                         className="hidden"
                         accept="image/*"
                         type="file"
                         onChange={handleSelectFile}
                      ></input>
                   </div>
                </div>
             </div>
             <div className="flex justify-end gap-2">
                <button className="bg-primary-500 text-white rounded-md py-2 px-4" onClick={handleOk}>
                   Lưu
                </button>
                <button onClick={handleCancel} className="bg-white hover:bg-gray-200 rounded-md py-2 px-4">
                   Hủy
                </button>
             </div>
          </Modal>
       </>
    );
};

export default SectorModal;
