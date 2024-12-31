import { EInputType, TFormField, TFormSection } from "../types/formField";
import { z } from "zod";

export const registerFormSchema = z.object({
  name: z
    .string({ required_error: "enter your firstname" })
    .min(4, { message: "firstname should not be less than 4 words" }),
  email: z.string().email({ message: "please enter valid email" }),
  password: z
    .string()
    .min(8, { message: "password should not be less than 8 words" }),
  role: z.string(),
  dob: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  phone: z.string().regex(/^[0-9]{10}$/),
  paddress: z.string({ required_error: "enter your permanent address" }),
  taddress: z.string({ required_error: "enter your temporary address" }),
  bloodGroup: z.string(),
  religion: z.string(),
  gender: z.string(),
  motherTongue: z.string(),
  admissionNo: z.string(),
  regdNo: z.string(),
  academicYear: z.string(),
  joiningDate: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  expectedPassoutDate: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/),
  studentType: z.string(),
  rollNo: z.string(),
  libraryId: z.string(),
  panNo: z.string(),
  staffId: z.string(),
  staffType: z.string(),
  licenseNo: z.string(),
  citizenshipId: z.string(),
  designation: z.string(),
  payrollType: z.string(),
});

export type TRegisterFormSchema = z.infer<typeof registerFormSchema>;
export const registerFormDefaultValue: Partial<TRegisterFormSchema> = {
  name: "",
  email: "",
  password: "",
  role: "",
  dob: "",
  phone: "",
  paddress: "",
  taddress: "",
  bloodGroup: "",
  religion: "",
  motherTongue: "",
  gender: "",
  admissionNo: "",
  regdNo: "",
  academicYear: "",
  joiningDate: "",
  expectedPassoutDate: "",
  studentType: "",
  rollNo: "",
  libraryId: "",
  panNo: "",
  staffId: "",
  staffType: "",
  licenseNo: "",
  citizenshipId: "",
  designation: "",
  payrollType: "",
};

export const registerFormField: TFormSection<TRegisterFormSchema>[] = [
  {
    title: "Personal Information",
    fields: [
      {
        label: "Name",
        name: "name",
        type: EInputType.TEXT,
        placeholder: "Enter your name",
        required: true,
        grid: 4,
      },
      {
        label: "Name",
        name: "name",
        type: EInputType.TEXT,
        placeholder: "Enter your name",
        required: true,
        grid: 4,
      },
      {
        label: "Gender",
        name: "gender",
        type: EInputType.SELECT,
        placeholder: "Enter your gender",
        required: true,
        grid: 1,
        option: [
          { value: "MALE", label: "male" },
          { value: "FEMALE", label: "female" },
        ],
      },
    ],
  },
];
