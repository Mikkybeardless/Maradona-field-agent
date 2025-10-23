interface KeyFeatureProps {
  product: ApiProductDetails & {
    id: number;
    created_at: string;
    updated_at: string;
  };
}

export const KeyFeatures = ({ product }: KeyFeatureProps) => {
  return (
    <div className="w-full bg-white p-4 pl-7 rounded-xl flex gap-x-2 items-start">
      <div className="w-2/4">
        <h3 className="text-sm font-semibold">Key Features</h3>
        {product.type === "CAR" ? (
          <ul className="text-sm pl-3 flex flex-col gap-y-2 mt-2.5 list-disc">
            <li className="opacity-70">
              Engine: {(product as ApiCar).engine_type}
            </li>
            <li className="opacity-70">
              Transmission: {(product as ApiCar).transmission}
            </li>
            <li className="opacity-70">
              Mileage: {(product as ApiCar).mileage}
            </li>
            <li className="opacity-70">Condition: {product.condition}</li>
          </ul>
        ) : product.type === "HOUSE" ? (
          <ul className="text-sm pl-3 flex flex-col gap-y-2 mt-2.5 list-disc">
            <li className="opacity-70">
              Accessibility: {(product as ApiHouse).accessibility}
            </li>
            <li className="opacity-70">
              Bedrooms: {(product as ApiHouse).house_beds}
            </li>
            <li className="opacity-70">
              House Type: {(product as ApiHouse).house_type}
            </li>
            <li className="opacity-70">
              Furniture: {(product as ApiHouse).house_furnished}
            </li>
            <li className="opacity-70">
              Condition: {(product as ApiHouse).house_condition}
            </li>
            <li className="opacity-70">
              Size: {(product as ApiHouse).house_size}
            </li>
          </ul>
        ) : product.type === "LAND" ? (
          <ul className="text-sm pl-3 flex flex-col gap-y-2 mt-2.5 list-disc">
            <li className="opacity-70">
              Accessibility: {(product as ApiLand).accessibility}
            </li>
            <li className="opacity-70">
              Land Type: {(product as ApiLand).land_type}
            </li>
            <li className="opacity-70">
              {" "}
              Fencing: {(product as ApiLand).fencing}
            </li>
            <li className="opacity-70">
              Topography: {(product as ApiLand).topography}
            </li>
            <li className="opacity-70">
              Land Size: {(product as ApiLand).land_size}
            </li>
          </ul>
        ) : null}
      </div>
      {/* <div className="w-2/4">
        <span className="text-sm font-semibold">Pricing and Availabilty</span>
        <ul className="text-sm flex flex-col gap-y-2 mt-2.5 list-none">
          <li className="opacity-70">
            Price: {formatAmountToNaira(Number(product.price))}
          </li>
          <li className="opacity-70">Negotiable: No</li>
          <li className="opacity-70">Location: Lekki, Lagos</li>
        </ul>
      </div> */}
    </div>
  );
};
