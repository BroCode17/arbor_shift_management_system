import { UserInsertType, UserSelectType, employeeSchema, certificateSchema, CertificateInsertType } from './../models/user';
import { Request, Response } from 'express';
import { dbConnection } from '../utils/db';
import { eq } from 'drizzle-orm';

const db = dbConnection;

interface CreateUserInput extends Omit<UserInsertType, "id" | "created_at" | "updated_at" | "deleted_at"> {
  certificates?: Array<Omit<CertificateInsertType, "id" | "employeeId" | "created_at" | "updated_at" | "deleted_at" >>;
}

class UserService {
  async createUser(employeeData: CreateUserInput): Promise<UserInsertType> {
    const requiresCertificate = employeeData.role === 'user';
    
    // Start a transaction
    return await db.transaction(async (tx) => {
      // Create user first
      const [user] = await tx.insert(employeeSchema)
        .values({
          ...employeeData,
          requiresCertificate
        })
        .returning();

      if (!user) {
        throw new Error('Failed to create user');
      }
      // For regular users, validate and create certificates
      if (requiresCertificate) {
        if (!employeeData.certificates?.length) {
          throw new Error('Regular users must provide at least one certificate');
        }

        // Validate certificate data
        // employeeData.certificates.forEach(cert => {
        //   if (!cert.certificateNumber || !cert.certificateName || 
        //       !cert.certificateIssuer || !cert.expiryDate) {
        //     throw new Error('All certificate fields are required');
        //   }
        // });

        // Create certificates for the user
        await tx.insert(certificateSchema)
          .values(
            employeeData.certificates.map(cert => ({
              ...cert,
              employeeId: user.id,
              isValid: true,
              created_at: new Date(),
            }))
          );
      }

      return user;
    });
  }

  async getUserByEmail(email: string): Promise<UserSelectType | undefined> {
    const user = await db.select().from(employeeSchema).where(eq(employeeSchema.email, email));
    return user[0];
  }

  async getAllUsers(): Promise<UserSelectType[] | undefined> {
    const users = await db.query.employeeSchema.findMany({
      with: {
        certificates: true
      }
    });
    return users;
  }
  
}

export default new UserService();