import { Formik, Form, Field, FormikHelpers, FieldProps } from "formik";
import Button from "../ui/Button";

interface IForm {
    name: string;
    minorDamageRate: number;
    majorDamageRate: number;
    usageLimit: number | null;
    isArchived: boolean;
}

const onSubmit = (values: IForm, actions: FormikHelpers<IForm>) => {
    console.log("Submitting");
};

const EnemyEditorPage = function EnemyEditorPage(props: any) {
    const initialForm: IForm = {
        name: "",
        minorDamageRate: 0,
        majorDamageRate: 0,
        usageLimit: null,
        isArchived: false,
    };
    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">
                NEW ENEMY
            </h2>

            <Formik initialValues={initialForm} onSubmit={onSubmit}>
                <Form>
                    <div className="flex">
                        <div>
                            <label
                                htmlFor="weaponName"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Weapon Name
                            </label>
                            <Field name="weaponName">
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

                    <div className="flex mt-2">
                        <div>
                            <label
                                htmlFor="minorDamageRate"
                                className="block text-gray-700 text-sm font-bold mb-2 mr-6"
                            >
                                Minor Damage Rate
                            </label>
                            <Field name="minorDamageRate">
                                {({ field }: FieldProps) => (
                                    <input
                                        type="text"
                                        className="shadow w-16 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </div>

                        <div>
                            <label
                                htmlFor="majorDamageRate"
                                className="block text-gray-700 text-sm font-bold mb-2 mr-6"
                            >
                                Major Damage Rate
                            </label>
                            <Field name="majorDamageRate">
                                {({ field }: FieldProps) => (
                                    <input
                                        type="text"
                                        className="shadow w-16 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        {...field}
                                    />
                                )}
                            </Field>
                        </div>

                        <div>
                            <label
                                htmlFor="usageLimit"
                                className="block text-gray-700 text-sm font-bold mb-2"
                            >
                                Usage Limit{" "}
                                <span className="text-xs font-normal">
                                    (blank for infinite)
                                </span>
                            </label>
                            <Field name="usageLimit">
                                {({ field }: FieldProps) => (
                                    <input
                                        placeholder="e.g 5"
                                        type="text"
                                        className="shadow w-16 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

export default EnemyEditorPage;
