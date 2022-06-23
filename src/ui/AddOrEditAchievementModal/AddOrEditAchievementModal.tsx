import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import Modal from "../Modal";
import TextInput from "../TextInput";

interface IProps {
    show: boolean;
    onClose: () => void;
}

const AddOrEditAchievementModal = ({
    show,
    onClose,
}: IProps) => {

    // useEffect
    // const {
    //     getFieldProps,
    //     getFieldMeta,
    //     handleSubmit,
    //     isValid,
    //     setValues,
    //   } = useFormik({
    //     // initialValues: {},
    //     // onSubmit,
    //     // validationSchema,
    //   });

    return (
        <section>
            <Modal show={show} onClose={onClose}>
                <h2 className="text-xteamaccent font-extrabold italic text-xl">
                    Edit Achievement
                </h2>
                <form>
                    <div className="flex space-x-6">
                    <div>
                        <TextInput
                        label="Description"
                        name="Description"
                        // {...getFieldProps("description")}
                        // {...getFieldMeta("description")}
                        />
                    </div>

                    <div>
                        <TextInput
                        label="Target Value"
                        name="target"
                        // {...getFieldProps("targetValue")}
                        // {...getFieldMeta("targetValue")}
                        />
                    </div>

                    <div>
                        <label
                        className="block text-gray-700 text-sm font-bold mt-9"
                        htmlFor="isEnabled"
                        >
                        <Checkbox 
                            // {...getFieldProps("isEnabled")}
                            name="target"
                            onChange={() => console.log("TEST")}
                            value={"1"}
                            // label="Is Enabled"
                        >
                            isEnabled
                        </Checkbox>
                        </label>
                    </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Button type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
};

export default AddOrEditAchievementModal;
