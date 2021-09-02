import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import { ARENA_ZONE_RING } from "../helpers/zonesHelper";
import Button from "../ui/Button";

interface IForm {
    name: string;
    isActive: boolean;
    isArchived: boolean;
    emoji: string;
    ring: string;
}

const onSubmit = (values: IForm, actions: FormikHelpers<IForm>) => {
    console.log("Submitting");
};

const ZoneEditorPage = function ZoneEditorPage(props: any) {
    const initialForm: IForm = {
        name: "",
        isActive: false,
        isArchived: false,
        emoji: "",
        ring: "",
    };
    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                NEW ZONE
            </h2>

            <Formik initialValues={initialForm} onSubmit={onSubmit}>
                <Form>
                    <div className="flex">
                        <div>
                            <label
                                htmlFor="zoneName"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Zone Name
                            </label>
                            <Field name="zoneName">
                                {({ field }: FieldProps) => (
                                    <input
                                        type="text"
                                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </div>
                    </div>

                    <div className="flex mt-4">
                        <div>
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2 mr-6"
                                htmlFor="isArchived"
                            >
                                <span className="block">
                                    Is Archived{" "}
                                    <span className="text-xs font-normal">
                                        (won't show up on games by default)
                                    </span>
                                </span>
                                <Field type="checkbox" name="toggle" />
                            </label>
                        </div>
                    </div>
                    <div className="flex mt-2">
                        <div>
                            <label
                                htmlFor="ring"
                                className="block text-gray-700 text-sm font-bold mb-2 mr-6"
                            >
                                Ring
                            </label>
                            <select name="ring" className="block">
                                <option value="" label="Select a ring value" />
                                {Object.values(ARENA_ZONE_RING).map((ring) => (
                                    <option
                                        key={ring}
                                        value={ring}
                                        label={ring}
                                    />
                                ))}
                            </select>
                        </div>

                        <div className="ml-4">
                            <label
                                htmlFor="emoji"
                                className="block text-gray-700 text-sm font-bold mb-2 mr-6"
                            >
                                Emoji
                            </label>
                            <Field name="emoji">
                                {({ field }: FieldProps) => (
                                    <input
                                        type="text"
                                        className="shadow w-32 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Button type="submit">Submit</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default ZoneEditorPage;
