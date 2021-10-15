import { FormikHelpers, useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { SyncLoader } from "react-spinners";
import * as Yup from "yup";
import { getZone, upsertZone } from "../api/admin";

import { ARENA_ZONE_RING } from "../helpers/zonesHelper";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Dropdown from "../ui/Dropdown";
import TextInput from "../ui/TextInput";

interface IForm {
    name: string;
    isActive: boolean;
    isArchived: boolean;
    emoji: string;
    ring: string;
}

interface IProps {
    editMode?: boolean;
}

const ZoneEditorPage = function ZoneEditorPage({ editMode }: IProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [, setRemoteZone] = useState<IZone | undefined>(undefined);
    const history = useHistory();

    const { zoneId } = useParams<{ zoneId: string }>();
    const numericZoneId = parseInt(zoneId);

    const onSubmit = async (values: IForm, actions: FormikHelpers<IForm>) => {
        console.log("test");
        setIsLoading(true);
        await upsertZone({
            ...(editMode && numericZoneId && { id: numericZoneId }),
            name: values.name,
            ring: values.ring,
            emoji: values.emoji,
            isArchived: values.isArchived,
        });

        history.push("/zones");
    };

    const initialForm: IForm = {
        name: "",
        isActive: false,
        isArchived: false,
        emoji: "",
        ring: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(30).required().label("Zone Name"),
        emoji: Yup.string()
            .max(30)
            .required()
            .matches(/^:.*:$/, "Must begin and end with :, e.g :my-emoji:")
            .label("Emoji"),
        ring: Yup.string().max(2).required().label("Zone Ring"),
        isActive: Yup.boolean().required().label("Is Active"),
        isArchived: Yup.boolean().required().label("Is Active"),
    });

    const {
        getFieldProps,
        getFieldMeta,
        handleSubmit,
        dirty,
        isValid,
        setValues,
    } = useFormik({
        initialValues: initialForm,
        onSubmit,
        validationSchema,
    });

    useEffect(() => {
        async function fetchRemoteZone() {
            if (!zoneId) {
                return;
            }
            const zone = await getZone(numericZoneId);
            setValues({
                name: zone.name,
                emoji: zone.emoji,
                ring: zone.ring,
                isActive: zone.isActive,
                isArchived: zone.isArchived,
            } as IForm);

            setRemoteZone(zone);
            setIsLoading(false);
            console.log({ zone });
            return zone;
        }

        fetchRemoteZone();
    }, [zoneId, numericZoneId, setValues]);

    if (isLoading) {
        return <SyncLoader />;
    }

    const isSubmitDisabled = !dirty || !isValid;

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                {editMode ? "UPDATE ZONE" : "NEW ZONE"}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="flex">
                    <div>
                        <TextInput
                            label="Zone Name"
                            {...getFieldProps("name")}
                            {...getFieldMeta("name")}
                        />
                    </div>

                    <div className="ml-8 mt-6">
                        <Checkbox
                            id="isArchived"
                            {...getFieldProps("isArchived")}
                            {...getFieldMeta("isArchived")}
                        >
                            Is Archived
                        </Checkbox>
                    </div>
                </div>
                <div className="flex mt-2">
                    <div>
                        <Dropdown
                            fieldProps={getFieldProps("ring")}
                            label="Ring"
                        >
                            <option
                                value=""
                                label="Select a ring..."
                                disabled
                            />
                            {Object.values(ARENA_ZONE_RING).map((ring) => (
                                <option key={ring} value={ring} label={ring} />
                            ))}
                        </Dropdown>
                    </div>
                    <div className="ml-4">
                        <TextInput
                            label="Emoji"
                            {...getFieldProps("emoji")}
                            {...getFieldMeta("emoji")}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <Button disabled={isSubmitDisabled} type="submit">
                        {editMode ? "Update Zone" : "Create Zone"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ZoneEditorPage;
