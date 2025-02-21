"use server";

import db from "@/lib/db";
import { PatientFormSchema } from "@/lib/schema";
import { clerkClient } from "@clerk/nextjs/server";

export async function updatePatient(data: any, pid: string) {
  try {
    const validateData = PatientFormSchema.safeParse(data);

    if (!validateData.success) {
      return {
        success: false,
        error: true,
        msg: "Provide all required fields",
      };
    }

    const patientData = validateData.data;

    const client = await clerkClient();
    await client.users.updateUser(pid, {
      firstName: patientData.first_name,
      lastName: patientData.last_name,
    //   emailAddress:[patientData.email],
    //   password:patientData.phone,

    });

    await db.patient.update({
      data: {
        ...patientData,
      },
      where: { id: pid },
    });

    return {
      success: true,
      error: false,
      msg: "Patient info updated successfully",
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: true, msg: error?.message };
  }
}
// export async function createNewPatient(data: any, pid: string) {
//   try {
//     const validateData = PatientFormSchema.safeParse(data);

//     if (!validateData.success) {
//       return {
//         success: false,
//         error: true,
//         msg: "Provide all required fields",
//       };
//     }

//     const patientData = validateData.data;
//     let patient_id = pid;

//     const client = await clerkClient();
//     if (pid === "new-patient") {
//       const user = await client.users.createUser({
//         emailAddress: [patientData.email],
//         password: patientData.phone,
//         firstName: patientData.first_name,
//         lastName: patientData.last_name,
//         publicMetadata: { role: "patient" },
//       });

//       patient_id = user?.id;
//     } else {
//       await client.users.updateUser(pid, {
//         publicMetadata: { role: "patient" },
//       });
//     }

//     await db.patient.create({
//       data: {
//         ...patientData,
//         id: patient_id,
//       },
//     });

//     return { success: true, error: false, msg: "Patient created successfully" };
//   } catch (error: any) {
//     console.error(error);
//     return { success: false, error: true, msg: error?.message };
//   }
// }
export async function createNewPatient(data: any, pid: string) {
    try {
      console.log("🚀 Received data in createNewPatient:", data);
      console.log("🆔 Patient ID before processing:", pid);
  
      const validateData = PatientFormSchema.safeParse(data);
      if (!validateData.success) {
        console.error("❌ Validation failed:", validateData.error);
        return {
          success: false,
          error: true,
          msg: "Provide all required fields",
        };
      }
  
      const patientData = validateData.data;
      console.log("✅ Validated patient data:", patientData);
  
      if (!patientData.email || !patientData.phone) {
        console.error("❌ Missing required fields:", { email: patientData.email, phone: patientData.phone });
        return {
          success: false,
          error: true,
          msg: "Email and phone are required.",
        };
      }
  
      let patient_id = pid;
      const client = await clerkClient();
  
      if (!patient_id || patient_id === "new-patient") {
        console.log("🛠️ Creating Clerk user...");
        const user = await client.users.createUser({
          emailAddress: [patientData.email],
          password: patientData.phone,
          firstName: patientData.first_name,
          lastName: patientData.last_name,
          publicMetadata: { role: "patient" },
        });
  
        console.log("✅ Clerk User Created:", user);
        if (!user?.id) {
          throw new Error("Clerk user creation failed: User ID is undefined.");
        }
        patient_id = user.id;
      } else {
        console.log("🔄 Updating existing Clerk user...");
        const updatedUser = await client.users.updateUser(patient_id, {
          publicMetadata: { role: "patient" },
        });
  
        console.log("✅ Clerk User Updated:", updatedUser);
      }
  
      console.log("🛠️ Creating patient record in database with ID:", patient_id);
      await db.patient.create({
        data: {
          ...patientData,
          id: patient_id,
        },
      });
  
      console.log("✅ Patient created successfully!");
      return { success: true, error: false, msg: "Patient created successfully" };
    } catch (error: any) {
      console.error("❌ Error in createNewPatient:", error);
      return { success: false, error: true, msg: error?.message };
    }
  }
  