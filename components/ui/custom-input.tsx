"use client";
import React, { useState, useEffect } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "./checkbox";
import { Textarea } from "./textarea";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";
import { Switch } from "./switch";

interface InputProps {
  type: "input" | "select" | "checkbox" | "switch" | "radio" | "textarea";
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  inputType?: "text" | "email" | "password" | "date";
  selectList?: { label: string; value: string }[];
  defaultValue?: string;
}

const RenderInput = ({ field, props }: { field: any; props: InputProps }) => {
  switch (props.type) {
    case "input":
      return (
        <FormControl>
          <Input
  type={props.inputType}
  placeholder={props.placeholder}
  {...field}
  defaultValue={field.value ?? ""} 
/>


        </FormControl>
      );

    case "select":
      return (
        <Select onValueChange={field.onChange} value={field.value ?? ""}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {props.selectList?.map((i, id) => (
              <SelectItem key={id} value={i.value}>
                {i.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
          id={props.name}
          checked={!!field.value} // Ensures boolean value
        onCheckedChange={(e) => field.onChange(e === true)}
        />

          <Label htmlFor={props.name} className="cursor-pointer">
            {props.label}
          </Label>
        </div>
      );

    case "radio":
      return (
        <div className="w-full">
          <FormLabel>{props.label}</FormLabel>
          <RadioGroup
            value={field.value ?? props.defaultValue ?? ""} // Ensures controlled radio input

            onValueChange={field.onChange}
          >
            {props.selectList?.map((i, id) => (
              <div className="flex items-center w-full" key={id}>
                <RadioGroupItem value={i.value} id={i.value} />
                <Label htmlFor={i.value}>{i.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );

    case "textarea":
      return (
        <FormControl>
          <Textarea placeholder={props.placeholder} {...field} />
        </FormControl>
      );

    default:
      return null;
  }
};

export const CustomInput = (props: InputProps) => {
  const { name, label, control, type } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          {type !== "radio" && type !== "checkbox" && <FormLabel>{label}</FormLabel>}
          <RenderInput field={field} props={props} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// Switch Input Component
type Day = {
  day: string;
  start_time?: string;
  close_time?: string;
};
interface SwitchProps {
  data: { label: string; value: string }[];
  setWorkSchedule: React.Dispatch<React.SetStateAction<Day[]>>;
}

export const SwitchInput = ({ data, setWorkSchedule }: SwitchProps) => {
  const [checkedDays, setCheckedDays] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCheckedDays(
      data.reduce((acc, item) => ({ ...acc, [item.value]: false }), {})
    );
  }, [data]);

  const handleChange = (day: string, field: keyof Day, value: string) => {
    setWorkSchedule((prevDays) => {
      return prevDays.some((d) => d.day === day)
        ? prevDays.map((d) => (d.day === day ? { ...d, [field]: value } : d))
        : [...prevDays, { day, [field]: value }];
    });
  };

  return (
    <div>
      {data.map((el, id) => (
        <div key={id} className="flex items-center space-y-3 border-t py-3">
          <Switch
            id={el.value}
            checked={checkedDays[el.value]}
            onCheckedChange={(e) => {
              setCheckedDays((prev) => ({ ...prev, [el.value]: e }));
              handleChange(el.value, "start_time", "09:00");
            }}
          />
          <Label htmlFor={el.value} className="w-20 capitalize">
            {el.label}
          </Label>

          <Label className="text-gray-400 italic pl-10">
            {!checkedDays[el.value] ? "Not working on this day" : ""}
          </Label>

          {checkedDays[el.value] && (
            <div className="flex items-center gap-2 pl-6">
              <Input
                type="time"
                defaultValue="09:00"
                onChange={(e) => handleChange(el.value, "start_time", e.target.value)}
              />
              <Input
                type="time"
                defaultValue="17:00"
                onChange={(e) => handleChange(el.value, "close_time", e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
