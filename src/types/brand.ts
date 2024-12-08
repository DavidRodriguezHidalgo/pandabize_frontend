import { z, ZodType } from "zod";

export default interface BrandType {
  id: number;
  price: number;
  name: string;
}

type FormDataItem = {
  name: string;
  value: string;
};

export type FormData = {
  quantity: number;
  features: FormDataItem[];
};

export const BrandFormSchema: ZodType<FormData> = z.object({
  quantity: z.number().min(1),
  features: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    })
  ),
});
