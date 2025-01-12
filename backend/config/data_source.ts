import { DataSource } from "typeorm";
import { User } from "../models/User";
import { Certification } from "../models/Certification";
import { UserCertification } from "../models/UserCertification";
import { Shift } from "../models/Shift";
import { ShiftCertification } from "../models/ShiftCertification";
import { Assignment } from "../models/Assignment";
import { Notification } from "../models/Notification";
import { AuditLog } from "../models/AuditLog";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "shift_management",
  // synchronize: process.env.NODE_ENV !== 'production', // Auto-create tables in development
  synchronize: false,
  logging: process.env.NODE_ENV !== "production",
  entities: [
    User,
    Certification,
    UserCertification,
    Shift,
    ShiftCertification,
    Assignment,
    Notification,
    AuditLog,
  ],
  subscribers: [],
  migrations: ["migration/*.ts"],
});
