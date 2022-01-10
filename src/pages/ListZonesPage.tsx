import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";
import { deleteZone, getZones } from "../api/admin";
import Button from "../ui/Button";

const ListZonesPage = function ListZonesPage(props: any) {
    const [zones, setZones] = useState<IZone[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchZones = async () => {
        setIsLoading(true);
        const zones = await getZones();
        setZones(zones || []);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchZones();
    }, []);

    const handleOnDeleteClick = (zone?: IZone) => async () => {
        if (!zone) {
            return;
        }

        const swalResult = await Swal.fire({
            title: `Delete zone ${zone.name} (${zone.ring})?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });
        if (!swalResult.isConfirmed) {
            return;
        }
        setIsLoading(true);
        await deleteZone(zone.id!);
        await fetchZones();
        setIsLoading(false);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold italic font-sans mb-8">ZONES</h2>

            <div className="mt-4">
                <a href="/zones/new">
                    <Button>New Zone</Button>
                </a>
            </div>

            {isLoading ? (
                <SyncLoader />
            ) : (
                <div className="mt-4">
                    {zones.map((zone: IZone, index: number) => (
                        <>
                            <div
                                className="flex justify-between my-4"
                                key={index}
                            >
                                <Link to={`/zone/${zone.id}`}>
                                    <div className="grid grid-cols-4 gap-4 items-center">
                                        <div className="w-52">
                                            <span className="text-xl font-bold">
                                                {zone.name}
                                            </span>
                                            {zone.isArchived ? (
                                                <div className="text-gray-500 italic font-bold text-sm">
                                                    Archived
                                                </div>
                                            ) : null}
                                        </div>
                                        <div>
                                            <div>Code</div>
                                            <div>{zone.ring}</div>
                                        </div>
                                    </div>
                                </Link>
                                <button
                                    onClick={handleOnDeleteClick(zone)}
                                    className="text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                            <hr className="my-2" />
                        </>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListZonesPage;
