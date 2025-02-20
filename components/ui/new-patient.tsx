"use client"
import { useUser } from '@clerk/nextjs';
import { Patient } from '@prisma/client'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';

import { Phone } from 'lucide-react';
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import {z} from "zod";
import { Form } from './form';
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod';
import { PatientFormSchema } from '@/lib/schema';
import { CustomInput } from './custom-input';

interface DataProps{
    data?:Patient;
    type:"create" | "update";
}

const NewPatient = ({data,type}:DataProps) => {
    const {user}=useUser()
    const [loading,setLoading]=useState(false)
    const [imgURL,setImgURL]=useState<any>()
    const router=useRouter()

    const userData={
        first_name:user?.firstName || "",
        last_name:user?.lastName || "",
        email: user?.emailAddresses[0].emailAddress || "",
        phone:user?.phoneNumbers?.toString() || ""
       }

       const form=useForm<z.infer<typeof PatientFormSchema>>({
        resolver:zodResolver(PatientFormSchema),
        defaultValues:{
          ...userData,
        },
       })
  return <Card className="max-w-6xl w-full p-4 ">

    <CardHeader>
        <CardTitle>Patient registation</CardTitle>
        <CardDescription>please provide all the inf below to help us understand better
           and provide good and quality service to you.</CardDescription>
    </CardHeader>
    <CardContent>
      <Form {...form}>
        <form onSubmit={()=>{}} className='space-y-8 mt-5'>
          <h3 className='text-lg font-semibold'>Personal Information</h3>
          <>
          <div className='flex flex:col lg:flex-row gap-y-6 items-center gap-2 md:gap-x-4'>
          <CustomInput
                type="input"
                control={form.control}
                name="first_name"
                placeholder="First Name"
                label="First Name"
              />
          </div>
          
          </>
        </form>
      </Form>
    </CardContent>
  </Card>

  
}
export default NewPatient
