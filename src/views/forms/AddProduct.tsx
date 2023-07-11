import { zodResolver } from "@hookform/resolvers/zod";
import { Control, FieldValues, useFieldArray, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import ProductService from "../../services/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import CategoryService from "../../services/categories";
import BrandService from "../../services/brands";
import CommonService from "../../services/common";
import { Category } from "../../interfaces/category";
import { Brand } from "../../interfaces/brand";
import { Common } from "../../interfaces/common";

const variantSchema = z.object({
  _id:z.number().optional(), 
  id: z.number().optional(),
  productId: z.number().optional(),
  size: z.string().nonempty(),
  color: z.string().nonempty(),
  image: z.string().nonempty(),
  qty: z.number().positive().gt(0),
  price: z.number().positive().gt(0),

});

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(3).nonempty(),
  description: z.string().min(3).nonempty(),
  image: z.string().nonempty(),
  category: z.string().nonempty(),
  brand: z.string().nonempty(),
  price: z.number().positive().gt(0),
  totalQty: z.number(),
  createdAt: z.string().default(new Date().toLocaleDateString()),
  variant: z.array(variantSchema).optional(),
});

type FormData = z.infer<typeof schema>;
type VariantFormData = z.infer<typeof variantSchema>;

const AddProduct = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [sizes, setSizes] = useState<Common[]>([]);
  const [colors, setColors] = useState<Common[]>([]);
  const {  state: stateData } = useLocation();

   const variantData = stateData?.variant?.map((d:any)=> ({...d, _id: Date.now()}))
   const state = { ...stateData, variant: variantData }; 
   
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    control,
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: state,
  });

  console.log(state);
  

  const { fields, prepend, remove } = useFieldArray<FieldValues>({
    control: control as Control, // control props comes from useForm (optional: if you are using FormContext)
    name: "variant", // unique name for your Field Array
    keyName:'_id'
  });

  useEffect(()=>{
    state?.variants?.forEach((defaultValue:any) => {
      prepend(defaultValue);
    });
  },[])

  useEffect(() => {
    CategoryService.getCategories().then((res) => setCategories(res.data));
    BrandService.getBrands().then((res) => setBrands(res.data));
    CommonService.getSizes().then((res) => setSizes(res.data));
    CommonService.getColors().then((res) => setColors(res.data));
  }, []);

  const image = watch("image");
  const id = getValues("id");

  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    ProductService.addProduct(data)
      .then((res) => {
        toast("Product Added Successfully", {
          position: "top-center",
          theme: "dark",
        });
        navigate("/admin/products");
      })
      .catch((err) => {
        toast(err.response.data.error, {
          position: "top-center",
          theme: "dark",
        });
      });
  };

  const ShowError = ({ field }: any) => {
    const error = errors as any;
    if (error[field]) {
      return <div className="text-danger m-2">{error[field].message}</div>;
    }
    return <></>;
  };

  const deleteVariant = (id: number)=>{
    ProductService.deleteVariant(id)
    .then((res) => {
      toast("Variant Deleted Successfully", {
        position: "top-center",
        theme: "dark",
      });
    })
    .catch((err) => {
      toast(err.response.data.error, {
        position: "top-center",
        theme: "dark",
      });
    });
  }

  const ShowVariantError = ({ field, index }: any) => {
    const error = errors as any;
    if (error?.variant?.[index]?.[field]) {
      return (
        <div className="text-danger m-2">
          {error?.variant?.[index]?.[field]?.message}
        </div>
      );
    }
    return <></>;
  };

  const setSelected = (field:string, property:string, c:any)=>{
    return state[field] === c[property]
  }

  return (
    <div className="fluid-container">
      <div className="p-1">
        <div className="row">
          <div className="col-12">
            <h3 className="mb-3 text-center text-black-50">Add Product</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="name">
                  Product Name
                </label>
                <input
                  {...register("name")}
                  placeholder="Enter Product Name"
                  id="name"
                  type="text"
                  className="form-control"
                />
                <ShowError field="name" />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="description">
                  Product Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Enter Product Description"
                  id="description"
                  rows={3}
                  className="form-control"
                />
                <ShowError field="description" />
              </div>
              <div className="row mb-3">
                <div className="col-6 ">
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  <select   {...register("category")} className="form-select" >
                    {categories?.map((c) => (
                      <option selected={setSelected('category','name',c)} key={c.id} value={c.name}>
                        {`${c.name} / ${c.subCategory}`}
                      </option>
                    ))}
                  </select>
                  <ShowError field="category" />
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="brand">
                    Brand
                  </label>
                  <select {...register("brand")} className="form-select"
                  >
                    {brands?.map((c) => (
                      <option selected={setSelected('brand','name',c)} key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                  <ShowError field="brand" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-6 ">
                  <label className="form-label" htmlFor="price">
                    Price
                  </label>
                  <input
                    {...register("price", { valueAsNumber: true })}
                    type="number"
                    className="form-control"
                    placeholder="Enter Price"
                  />
                  <ShowError field="price" />
                </div>
                <div className="col-6">
                  <label className="form-label" htmlFor="totalQty">
                    Total Qty
                  </label>
                  <input
                    {...register("totalQty", { valueAsNumber: true })}
                    type="number"
                    className="form-control"
                    placeholder="Enter TotalQty"
                  />
                  <ShowError field="totalQty" />
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label" htmlFor="image">
                  Image
                </label>
                <input
                  {...register("image")}
                  placeholder="Paste Your Product Image"
                  id="image"
                  type="text"
                  className="form-control mb-2"
                />
                <ShowError field="image" />
                {image && (
                  <div className="mt-1 mb-1">
                    <img
                      className="mx-1"
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "1.5rem",
                      }}
                      src={image}
                      alt="wrong image"
                    />
                    {fields.map((field: any, index) => (
                      <>
                        {field?.image && <img
                          className="mx-1"
                          style={{
                            width: "200px",
                            height: "200px",
                            borderRadius: "1.5rem",
                          }}
                          src={field?.image}
                          alt="variant image"
                        /> }
                      </>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <h6 className="text-center mt-1">Add Variant</h6>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    prepend({
                      size: "",
                      color: "",
                      image: "",
                      qty: null,
                      price: null,
                    })
                  }
                >
                  Add Variant
                </button>
              </div>

              {/* field Array */}
              {fields.map((variant: any, index) => (
                <div key={variant.id} className="border rounded p-4 mb-3">
                  <div className="row">
                    <div className="d-flex mb-1">
                      <h6 className="text-muted">Variant {index + 1}</h6>
                      <i
                        style={{ cursor: "pointer", marginLeft: 'auto' }}
                        onClick={() => {
                          remove(index)
                          debugger;
                          if(id) deleteVariant(variant.id)
                        }}
                      >
                        <FontAwesomeIcon icon={faClose} />
                      </i>
                    </div>
                    <div className="border-bottom mt-2 mb-4"></div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label" htmlFor="size">
                        Size
                      </label>
                      <select
                        {...register(`variant[${index}].size`)}
                        placeholder="Enter Size"
                        
                        className="form-select"
                      >
                        {sizes?.map((c) => (
                          <option selected={getValues(`variant[${index}].size`) === c.name} key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ShowVariantError index={index} field={`size`} />
                    </div>
                    <div className="col-6">
                      <label className="form-label" htmlFor="color">
                        Color
                      </label>
                      <select
                        {...register(`variant[${index}].color`)}
                        placeholder="Enter color"
                        className="form-select"
                      >
                        {colors?.map((c) => (
                          <option selected={getValues(`variant[${index}].color`) === c.name} key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <ShowVariantError index={index} field={`color`} />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label" htmlFor="qty">
                        Qty
                      </label>
                      <input
                        {...register(`variant[${index}].qty`, {
                          valueAsNumber: true,
                        })}
                        type="number"
                        placeholder="Enter Qty"
                        defaultValue={variant.qty}
                        className="form-control"
                      />
                      <ShowVariantError index={index} field={`qty`} />
                    </div>
                    <div className="col-6">
                      <label htmlFor="price" className="form-label">
                        Price
                      </label>
                      <input
                        {...register(`variant[${index}].price`, {
                          valueAsNumber: true,
                        })}
                        placeholder="Enter Price"
                        defaultValue={variant.price}
                        className="form-control"
                      />
                      <ShowVariantError index={index} field={`price`} />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                      Image
                    </label>
                    <input
                      {...register(`variant[${index}].image`)}
                      placeholder="Paste Image"
                      defaultValue={variant.image}
                      className="form-control"
                    />
                    <ShowVariantError index={index} field={`image`} />
                  </div>
                </div>
              ))}
              {/* close */}

              <button type="submit" className="btn btn-primary  mb-3">
                {id ? "Update" : "Add"} Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
